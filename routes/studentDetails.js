const express = require("express");
const router = express.Router();
const {
  verifyAdminToken,
  verifyDoctorOrAdminToken,
} = require("../Middleware/verifyToken");
const {
  getStudentDetails,
  addStudents,
} = require("../controllers/studentDetails");

// Student-Details API
router.get("/", verifyDoctorOrAdminToken, getStudentDetails);

// Student-Upload API
router.post("/", verifyAdminToken, addStudents);

module.exports = router;
