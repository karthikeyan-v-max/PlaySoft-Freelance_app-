const express = require('express');
const {createConservation , updateConservation , getConservations , getSingleConservation} = require('../controllers/conversation.controller');
const router = express.Router()
const { verifyToken } = require('../middleware/jwt.js');


router.post("/", verifyToken , createConservation);
router.get("/", verifyToken , getConservations);
router.get("/single/:id", verifyToken , getSingleConservation);
router.put("/:id", verifyToken , updateConservation );

module.exports = router;