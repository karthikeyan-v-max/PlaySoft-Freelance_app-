const mongoose = require('mongoose');


const ConversationSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique: true,
    },
    sellerId:{
        type:String,
        required:true,
    },
    buyerId:{
        type:String,
        required:true,
    },
    readBySeller:{
        type:Boolean,
        required:true,
    },
    readByBuyer:{
        type:Boolean,
        required:true,
    },
    lastMessages:{
        type:String,
        required:false,
    },
},{
    timestamps:true,
});

module.exports = mongoose.model("Coversation" , ConversationSchema);