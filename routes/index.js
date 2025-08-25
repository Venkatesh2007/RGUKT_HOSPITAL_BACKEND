const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const signUpRouter = require("./signUp");
const appointmentsRouter = require("./treatments");
const medicinesRouter = require("./medicines");
const studentDetailsRouter = require("./studentDetails");
const profileRouter = require("./profile");
const userDetailsRouter = require("./userDetails");
const adminChartsRouter = require("./chartsData");
const existingUserRouter = require("./existingUserIds");
const forgotPasswordRouter = require("./forgotPassword");
const summaryRouter = require("./summary");
const othersRouter = require("./others");

// Use the routes from the different files

router.use("/login", loginRouter);
router.use("/signup", signUpRouter);
router.use("/treatments", appointmentsRouter);
router.use("/medicines", medicinesRouter);
router.use("/student-details", studentDetailsRouter);
router.use("/profile", profileRouter);
router.use("/users", userDetailsRouter);
router.use("/admin-charts-data", adminChartsRouter);
router.use("/latest-user-ids", existingUserRouter);
router.use("/forgot-password", forgotPasswordRouter);
router.use("/summary", summaryRouter);
router.use("/others/treatments", othersRouter);

module.exports = router;
