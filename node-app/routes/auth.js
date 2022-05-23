var express = require("express");
const router = express.Router();
const {signin, signup} = require("../controllers/auth-controller.js");
const verifyToken = require('../middleware/authJWT');

router.post("/register", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {

});

router.get("/hidden-content", verifyToken, function (req, res) {
    if (!req.acteur) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    res.status(200)
        .send({
          message: "Congratulations! but there is no hidden content"
        });

  })

module.exports = router;