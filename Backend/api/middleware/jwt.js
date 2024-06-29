const jwt = require('jsonwebtoken');
const createError = require('../utils/createError.js');
const verifyToken = (req,res , next)=>{
    try{
        const token = req.cookies.accessToken;
        
        if (!token){
            return next(createError(401,"You're not Authenticated!"))
        }
        jwt.verify(token , process.env.JWT_KEY ,(err , payload)=>{
            if(err){
                return next(createError(403,"Invalid token"))
            }
            req.userId = payload.id;
            req.isSeller = payload.isSeller;
            next();
        });
    }catch(err){
        next(err);
    }
        
}

module.exports = {verifyToken};