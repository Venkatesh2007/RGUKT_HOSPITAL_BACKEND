const express = require("express");
const router = express.Router();
const { getOtp, verifyOtp } = require("../controllers/otpCenter");

router.get("/", getOtp);

router.post("/verify", verifyOtp);

module.exports = router;
