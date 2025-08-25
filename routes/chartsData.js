const express = require("express");
const router = express.Router();
const { getChartsData } = require("../controllers/getChartsData");
const { verifyAdminToken } = require("../Middleware/verifyToken");

router.get("/", verifyAdminToken, getChartsData);

module.exports = router;
