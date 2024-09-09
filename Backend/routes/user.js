const express=require('express');
const {User}=require('../db');
const {Account}=require('../db');
const jwt=require('jsonwebtoken'); 
const {TOKEN} = require('../config');
const authmiddleware=require('../middleware/authentication');
const router=express.Router();


//give username
router.get('/findUserName',async(req,res)=>{
    const UserId=req.query.userId;
    const userDetails=await User.findOne({_id:UserId});
    if(!userDetails){
        return res.status(400).json({msg:"No user found with this email id"});
    }
    res.status(200).json({"Name":userDetails.firstname});
})

//create a new user
router.post('/signup',async (req,res)=>{
    const email=req.body.email.toLowerCase();
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const password=req.body.password;

    try{
    const olduser=await User.findOne({
         email: { $regex: new RegExp("^" + email, "i") } }//for prevent case sensitivity
    )

    if(olduser){
        console.log("User already exixts");
        return res.status(411).json({msg:"User already exists"})
    }

    const user=await User.create({
        email,
        firstname,
        lastname,
        password
    })
    const userId=user._id;
    //create account and give dummy balance
    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })
    //assign token
    const token=jwt.sign({
    userId:user._id
    },TOKEN);

    res.status(200).json({
        msg:"User created successfully",
        token:token
    })
}
catch(e){
        console.log("Error while creating user",e);
    }
})

//signin user
router.post('/signin',async (req,res)=>{
    const email=req.body.email.toLowerCase();
    const password=req.body.password;

    try{
        const isuser=await User.findOne({
        email: { $regex: new RegExp("^" + email, "i") },//for prevent case sensitivity
        password
    })
    console.log(isuser);
    if(!isuser){
        return res.status(411).json({msg:"No user found"})
    }

    const token=jwt.sign({
        userId:isuser._id
        },TOKEN)
        res.status(200).json({"token":token});
      }
    catch(e){
    res.status(411).json({msg:"Error while logging in or no user exists"})
}
})

//update a user
router.put('/user',authmiddleware,async (req,res)=>{
const firstname=req.body.username;
const lastname=req.body.lastname;
const password=req.body.password;

try{
const updateduser=await User.updateOne({
    firstname:firstname,
    lastname:lastname,
    password:password
})
}catch(e){
    console.log("Error while updating user",e);
    res.status(411).json("Error while updating information");
}
    res.status(200).json({msg:"User updated successfully"})

})

//show user friends using filter
router.get('/bulk',async(req,res)=>{
    const filter = req.query.filter || "";

    // Split filter by spaces (to support full name search)
    const filterParts = filter.split(" ");

    let conditions = [];

    // If there are multiple parts, assume the user is searching for a full name
    if (filterParts.length > 1) {
        conditions.push({
            $and: [
                { firstname: { "$regex": filterParts[0], "$options": "i" } }, // First part in firstname
                { lastname: { "$regex": filterParts[1], "$options": "i" } }   // Second part in lastname
            ]
        });
    }

    // Also add the condition to check for partial matches on either firstname or lastname
    conditions.push(
        { firstname: { "$regex": filter, "$options": "i" } },
        { lastname: { "$regex": filter, "$options": "i" } }
    );

    // Use $or to match either the full name condition or the individual name conditions
    const users = await User.find({
        $or: conditions
    });


    res.status(200).json({
        user:users.map(user=>({
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })

})


module.exports=router;