const express=require('express');
const userRouter=require("./user");
const accounRouter=require("./account");

const router=express.Router();

router.use('/user',userRouter);
router.use('/account',accounRouter);

module.exports=router;