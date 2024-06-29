const express = require('express');
const { getOrders , intent , confirmation} = require('../controllers/order.controller');
const router = express.Router()
const { verifyToken } = require('../middleware/jwt.js');

router.get("/" , verifyToken , getOrders);
router.post("/create-payment-intent/:id" , verifyToken , intent)
router.put("/" , verifyToken , confirmation)


module.exports = router;