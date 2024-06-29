const Message = require("../models/message.model")
const Conversations = require("../models/coversation.model");

const getMessage = async(req,res,next)=>{
    try{
        const messages = await Message.find({
            conversationId : req.params.id
        });
        res.status(200).send(messages);

    }catch(err){
        next(err);
    }
};


const CreateMessage = async(req,res,next)=>{
    try{

        const newMessage = new Message({
            conversationId : req.body.conversationId,
            userId : req.userId,
            desc : req.body.desc
        });

        if (!req.body.conversationId || !req.body.desc) {
            return res.status(400).send({ message: "ConversationId and description are required." });
          }

        const savedMessage = await newMessage.save();
        
        const updatedConversation = await Conversations.findOneAndUpdate({
            id : req.body.conversationId
        },{
            $set:{
                readByBuyer : !req.isSeller,
                readBySeller : req.isSeller,
                lastMessages : req.body.desc
            }
        } ,{new : true});
        if (!updatedConversation){
            return res.status(404).send({ message: "Conversation not found." });
        }
        res.status(201).send(savedMessage);
    }catch(err){
        next(err);
    }
};

module.exports = {getMessage , CreateMessage};



