var express = require("express");
const router = express.Router();
const {createDP} = require("../controllers/dataProduct-controller.js");
const verifyToken = require('../middleware/authJWT');

router.post("/create-dp", verifyToken, createDP);

module.exports = router;