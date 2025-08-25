const express = require("express");
const router = express.Router();
const { Doctor, Pharmacist, Admin, Nurse } = require("../models");
const generateJwtToken = require("../controllers/generateJwtToken");
const { verifyPassword } = require("../controllers/passwordHashing");

// Candidate Login API
router.post("/", async (req, res) => {
  const { userId, password } = req.body;
  try {
    let user, role;
    if (userId.startsWith("D")) {
      user = await Doctor.findOne({ userId });
      role = "doctor";
    } else if (userId.startsWith("P")) {
      user = await Pharmacist.findOne({ userId });
      role = "pharmacist";
    } else if (userId.startsWith("A")) {
      user = await Admin.findOne({ userId });
      role = "admin";
    } else if (userId.startsWith("N")) {
      user = await Nurse.findOne({ userId });
      role = "nurse";
    } else {
      res.status(400).json({ message: "Invalid user type" });
      return;
    }

    if (!user) {
      res.status(400).json({ message: "Login Failure" });
      return;
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (isValidPassword) {
      const jwtToken = generateJwtToken(userId, role);
      return res.status(201).json({ jwtToken });
    }

    res.status(400).json({ messag: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
