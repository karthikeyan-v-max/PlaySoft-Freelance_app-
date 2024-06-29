const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
        
    },
    country:{
        type:String,
        required:true,
    },
    //we are going to save the img url that's why it is string
    img:{
        type:String,
        required:false,
    },
    phone:{
        type:String,
        required:false,
    },
    desc:{
        type:String,
        required:false,
    },
    isSeller:{
        type:Boolean,
        default:false,
    },
},{
    timestamps:true,
});

module.exports = mongoose.model("USER" , userSchema)