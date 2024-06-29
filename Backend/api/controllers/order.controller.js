const Gig = require("../models/gig.model");
const Order = require("../models/order.model");
require('dotenv').config();
const Stripe = require("stripe")

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY)
const intent = async( req,res,next ) => {
    const gig = await Gig.findById(req.params.id);
    try{

        const paymentIntent = await stripe.paymentIntents.create({
            amount: gig.price * 100,
            currency: "usd",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
              enabled: true,
            },
        });
        const newOrder = new Order({
            gigId : gig._id,
            img : gig.cover,
            title : gig.title,
            buyerId : req.userId,
            sellerId : gig.userId,
            price : gig.price,
            payment_intent : paymentIntent.id,
        });

        await newOrder.save();
        res.status(200).send({
            clientSecret : paymentIntent.client_secret})
    }catch(err){
        next(err);
    }
}


const getOrders= async(req,res,next)=>{
    try{
        const order = await Order.find({
            ...(req.isSeller ? {sellerId : req.userId} : { buyerId : req.userId }),
            isCompleted : true,
        });
        res.status(200).send(order);
    }catch(err){
        next(err);
    }
}

const confirmation = async(req,res,next)=>{
    try{
        const order = await Order.findOneAndUpdate({ 
            payment_intent : req.body.payment_intent 
        },
            {
                $set : {
                    isCompleted : true
                }
            }
        );

        res.status(200).send("payment successfully completed");
    }catch(err){
        next(err);
    }
}

module.exports =  { getOrders , intent , confirmation};