const createError = require("../utils/createError");
const Gigs = require("../models/gig.model");

const createGig = async(req,res,next)=>{
    // if the logged in user is not a seller
    if (!req.isSeller){
        return next(createError("only sellers can create a gig"));
    }
    const newGig = new Gigs({
        userId : req.userId,
        ...req.body,
    })
    try{
        const savedGig = await newGig.save();
        res.status(201).json(savedGig)
    }catch(err){
        next(err)
    }
}
const deleteGig = async(req,res,next)=>{
    try{
    const gig = await Gigs.findById(req.params.id);
    // invalid id or cannot find the gigs
    if(gig === null){
        next(createError(404 , "gigs not found or invalid userid"))
    }

    if(gig.userId !== req.userId){
        next(createError(500 , "You can only delete your gig"))
    }
    await Gigs.findByIdAndDelete(req.params.id);
    res.status(200).send("gig has been deleted");
    }catch(err){
    next(err)
}
}

const getGig = async(req , res , next) => {
    try{
        const gig = await Gigs.findById(req.params.id);
        if(!gig){
            next(createError(404 , "gig not found"))
        }
        res.status(200).send(gig)
    }catch(err){
        
        next(err)
    }
}

const getGigs = async(req , res , next) => {
    const q = req.query;
    const filters = {
        ...(q.gigId && { _id : q.gigId}),
        ...(q.userId && { userId : q.userId }),
        ...(q.cat && {cat: q.cat }),
        ...((q.min || q.max) && {price: {...(q.min && { $gt : q.min }) , ...(q.max && { $lt: q.max })}}),
        ...(q.search && { title : { $regex : q.search , $options:"i"} } )
    };
    try{
        const gigs = await Gigs.find(filters).sort({[q.sort] : -1});
        if(gigs.length === 0){
            return next(createError(500 , "there is no gig created"));
        }
        res.status(201).send(gigs);
    }catch(err){
        next(err)
    }
}

module.exports = {createGig , deleteGig , getGig, getGigs}