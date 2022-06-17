var express = require("express");
const router = express.Router();

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {createDP, getAllDPs, getMyDPs, createFolder, upload_data, get_data} = require("../controllers/dataProduct-controller.js");
const { sql_query } = require("../controllers/dataProduct-controller.js");
const verifyToken = require('../middleware/authJWT');

router.post("/create-dp", verifyToken, createDP);
router.get("/get-dps", verifyToken, getAllDPs);
router.get("/get-my-dps", verifyToken, getMyDPs);
router.post("/create-folder", verifyToken, createFolder);
router.post("/:dp_id/upload_data", upload.single('file'), upload_data);
router.get("/:dp_id/get_data", get_data);
//router.get("/test", test_csv);
router.get("/sql-query", sql_query);

module.exports = router;