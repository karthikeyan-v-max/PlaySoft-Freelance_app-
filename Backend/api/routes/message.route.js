const express = require('express');
const { getMessage , CreateMessage } = require('../controllers/message.controller');
const router = express.Router()
const { verifyToken } = require('../middleware/jwt.js');

router.get("/:id" , verifyToken , getMessage);
router.post("/" , verifyToken , CreateMessage)

module.exports = router;