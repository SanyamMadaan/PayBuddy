const express=require('express');
const mongoose=require('mongoose');
const authmiddleware=require('../middleware/authentication');
const router=express.Router();
const {Account}=require('../db');

router.get('/balance',authmiddleware,async(req,res)=>{
const response=await Account.findOne({
    userId:req.userId
})
res.status(200).json({"balance":response.balance})
})

router.post('/transfer',authmiddleware,async(req,res)=>{
const session=await mongoose.startSession();
session.startTransaction();

const to=req.body.to;
const amount=req.body.amount;

const account=await Account.findOne({
    userId:req.userId
}).session(session);

if(!account || account.balance<amount){
    await session.abortTransaction();
    return res.status(400).json({msg:"Insufficient balance"})
}

const toaccount=await Account.findOne({
    userId:to
}).session(session);

if(!toaccount){
    await session.abortTransaction();
    return res.status(400).json({msg:"Invalid account"})
}

//perform the transfer
await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

await session.commitTransaction();

res.json({
    msg:"Transfer successful"
})
});

module.exports=router;