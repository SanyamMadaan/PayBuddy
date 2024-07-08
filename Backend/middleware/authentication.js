const jwt=require('jsonwebtoken');
const {TOKEN}=require('../config');

const authmiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(403).json({msg:"Invalid Token"})
    }
    const receivedToken=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(receivedToken,TOKEN);
        req.userId=decoded.userId;
        next();
    } catch(e){
        res.status(403).json({msg:"Invalid Token"})
    }
};

module.exports=authmiddleware;