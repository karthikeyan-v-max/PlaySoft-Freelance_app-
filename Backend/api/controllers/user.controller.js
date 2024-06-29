const User = require("../models/User.model.js");
const createError = require("../utils/createError.js");

const deleteUser = async(req,res ,next)=>{
    try{
    const user = await User.findById(req.params.id);
    
    if(!user){
        return next(createError(404 , "User does not exist"))
    }   
    if(req.userId !== user._id.toString()){
        return next(createError(403 , "you can only delete your account!"))    
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("user deleted successfully")
    }catch(err){
        next(err);
    }
    
}
const Getuser = async(req , res , next )=>{
    try{
    const user = await User.findById(req.params.id);
    if(!user){
        next(createError(404 , "user not found"));
    }
    res.status(200).send(user);
    }catch(err){
        next(err);
    }

}
module.exports = {deleteUser , Getuser};