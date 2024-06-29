const User = require('../models/User.model')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const createError = require('../utils/createError');

const register = async(req,res,next)=>{
    try{

        const hash = bcrypt.hashSync(req.body.password , 5);
        const newUser = new User({
            ...req.body,
            password:hash
            
        });

        await newUser.save();
        res.status(201).send(`the user with name ${newUser.username} is created`)
        console.log(hash)
        
    }catch(err){
        next(err);
    }
};


const login = async(req , res, next)=>{
    try{
        const user = await User.findOne({ username: req.body.username });
        if (!req.body.username || !req.body.password) {
            return next(createError(404, "Please enter username and password"));
        }
        if(!user){
            return next(createError(404 , "User not found"))
        }
        const isCorrect = bcrypt.compareSync(req.body.password , user.password);
        if(!isCorrect){
            return next(createError(400 , "Wrong password or Username"))
        }
        const token = jwt.sign(
            {
            id:user._id, 
            isSeller: user.isSeller,
        },process.env.JWT_KEY ); 

        const {password, ...info} = user._doc;
        res.cookie( "accessToken" , token,{
                httpOnly: true,
            })
        res.status(200).send(info);
    }catch(err){
        next(err)
    }
};


const logout = async(req , res)=>{
    res.clearCookie("accessToken" , {
        sameSite:"none",
        secure: true,
    }).status(200).send("user has been logged out")
};

module.exports =  { register , login , logout};