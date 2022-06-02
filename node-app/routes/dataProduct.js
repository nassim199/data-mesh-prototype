var express = require("express");
const router = express.Router();
const {createDP, getAllDPs, test} = require("../controllers/dataProduct-controller.js");
const verifyToken = require('../middleware/authJWT');

router.post("/create-dp", verifyToken, createDP);
router.get("/get-dps", verifyToken, getAllDPs);
router.get("/test", test);

module.exports = router;