var express = require("express");
const router = express.Router();

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {upload_data, get_data} = require("../controllers/data-controller.js");
const { sql_query, test_redirect } = require("../controllers/data-controller.js");
const verifyToken = require('../middleware/authJWT');


router.post("/:dp_id/upload_data", upload.single('file'), upload_data);
router.get("/:dp_id/get_data", get_data);
router.get("/sql-query", sql_query);
router.get("/", test_redirect);

module.exports = router;