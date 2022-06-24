var express = require("express");
const router = express.Router();

const {createDP, getAllDPs, getMyDPs, getDP, createFolder, getDataLineage} = require("../controllers/dataProduct-controller.js");
const verifyToken = require('../middleware/authJWT');

router.post("/create-dp", verifyToken, createDP);
router.get("/get-dps", verifyToken, getAllDPs);
router.get("/get-my-dps", verifyToken, getMyDPs);
router.post("/create-folder", verifyToken, createFolder);

router.get("/:dp_id/data-lineage", getDataLineage);
router.get("/:dp_id", getDP);

module.exports = router;