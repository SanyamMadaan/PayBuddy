const express=require('express');
const {User}=require('../db');
const {Account}=require('../db');
const jwt=require('jsonwebtoken'); 
const {TOKEN} = require('../config');
const authmiddleware=require('../middleware/authentication');
const router=express.Router();

//create a new user
router.post('/signup',async (req,res)=>{
    const email=req.body.email;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const password=req.body.password;

    try{
    const olduser=await User.findOne({
        email
    })

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
    const email=req.body.email;
    const password=req.body.password;

    try{
        const isuser=await User.findOne({
        email,
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
    const filter=req.query.filter || "";
    const users=await User.find({
        $or:[{firstname:{
            "$regex":filter
        }
    },{
        lastname:{
            "$regex":filter
        }
    }
    ]
    })

    res.status(200).json({
        user:users.map(user=>({
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })

})


module.exports=router;