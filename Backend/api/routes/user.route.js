const express = require('express');
const { deleteUser , Getuser } = require("../controllers/user.controller.js");
const {verifyToken} = require('../middleware/jwt.js');

const router = express.Router()

router.delete("/:id", verifyToken, deleteUser)
router.get("/:id" , verifyToken , Getuser);

module.exports = router;