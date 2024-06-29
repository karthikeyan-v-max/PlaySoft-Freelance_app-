const createError = require("../utils/createError.js")
const Review = require("../models/review.model.js")
const Gig = require("../models/gig.model.js")

const createReview = async (req , res , next) => {
    
    try{
        if (req.isSeller){
            return next(createError(403 , "I thing you're the seller of this gig so you can't add reviews"));
        }
        const newReview = new Review({
            gigId : req.body.gigId,
            userId : req.userId,
            star : req.body.star,
            desc : req.body.desc
        });

        const review = await Review.findOne({ 
            gigId : req.body.gigId , 
            userId : req.userId
        });

        if (review){
            return next(createError(403 , "You have already created a review for this gig"));
        }

        await Gig.findByIdAndUpdate(req.body.gigId , {$inc : {totalStars : req.body.star , stars:1}})

        const savedReview = await newReview.save()

        res.status(200).send(savedReview);
    }catch(err){
        console.log(err)
        next(err) 
    }
};

const deleteReview = async() => {
    try {
        // Implementation for deleting a review (assuming req has the necessary information)
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const getReviews = async( req , res , next ) => {
    try{
        const reviews = await Review.find({ gigId : req.params.id });
        res.status(200).send(reviews);
    }catch(err){
        console.log(err)
        next(err);
    }
    
};

module.exports =  { createReview , deleteReview , getReviews };
