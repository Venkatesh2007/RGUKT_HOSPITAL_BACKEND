const express = require("express");
const {
  getAdminDetails,
  getDoctorDetails,
  getNurseDetails,
  getPharmacistDetails,
} = require("../controllers/getUserDetails");
const router = express.Router();

router.get("/admins", getAdminDetails);
router.get("/doctors", getDoctorDetails);
router.get("/nurses", getNurseDetails);
router.get("/pharmacists", getPharmacistDetails);

module.exports = router;
