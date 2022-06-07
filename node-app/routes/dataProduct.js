var express = require("express");
const router = express.Router();

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {createDP, getAllDPs, upload_data, get_data} = require("../controllers/dataProduct-controller.js");
const { test_csv, test_python } = require("../controllers/dataProduct-controller.js");
const verifyToken = require('../middleware/authJWT');

router.post("/create-dp", verifyToken, createDP);
router.get("/get-dps", verifyToken, getAllDPs);
router.post("/:dp_id/upload_data", upload.single('file'), upload_data);
router.get("/:dp_id/get_data", get_data);
router.get("/test", test_csv);
router.get("/test_sql", test_python);

module.exports = router;