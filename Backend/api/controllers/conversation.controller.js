const conversations = require("../models/coversation.model");
const createError = require("../utils/createError");

const createConservation = async(req , res , next)=>{

    const newConservation = new conversations({
        id : req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
        sellerId : req.isSeller ? req.userId : req.body.to,
        buyerId : req.isSeller ? req.body.to : req.userId,
        readBySeller : req.isSeller,
        readByBuyer : !req.isSeller,
    });
    
    try{
        const savedNewConservation = await newConservation.save();
        res.status(200).send(savedNewConservation);
    }catch(err){
        next(err);
    }
};

const getConservations = async(req,res,next)=>{
    try{
        const conversation = await conversations.find( req.isSeller ? { sellerId : req.userId } : { buyerId : req.userId}).sort({updateAt:-1});
        
        res.status(200).send(conversation); 
    }catch(err){
        next(err);
    }
}

const getSingleConservation = async(req,res,next)=>{
    try{
    const singleconversation = await conversations.findOne({ id : req.params.id});
    if (!singleconversation) return next(createError( 400 , "cannot fetch your message"))
    res.status(200).send(singleconversation);
    }catch(err){
        next(err);
    }
}

const updateConservation = async(req,res,next)=>{
    try{
        const updatedconversation = await conversations.findOneAndUpdate(
            { id:req.params.id },
            {
                $set:{
                    ...(req.isSeller ? { readBySeller : true } : { readByBuyer : true})
                },
            },
            {new : true},//without this line we cannot see the updated conversations, so remember this
        )

    res.status(200).send(updatedconversation)
    }catch(err){
        next(err);
    }
}


module.exports = {createConservation , getConservations , getSingleConservation , updateConservation};
