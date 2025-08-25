const express = require("express");
const router = express.Router();
const { verifyAdminToken } = require("../Middleware/verifyToken");
const { ExistingUserIds } = require("../models");

router.get("/", verifyAdminToken, async (req, res) => {
  try {
    const data = await ExistingUserIds.find();
    let users = {
      doctor: 111111,
      nurse: 111111,
      pharmacist: 111111,
      admin: 111111,
    };
    data.map((element) => {
      users[element["role"]] = parseInt(element.userId) + 1;
    });
    res.status(200).json({ latestUserIds: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
