const express = require('express');
const {getReviews , deleteReview , createReview} = require('../controllers/review.controller.js');
const { verifyToken } = require('../middleware/jwt.js');
const router = express.Router()

router.get("/:id" , getReviews);
router.delete("/:id" , deleteReview);
router.post("/" ,verifyToken, createReview);

module.exports = router;