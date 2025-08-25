const express = require("express");
const router = express.Router();
const {
  getPharmacistProfile,
  getDoctorProfile,
  getAdminProfile,
  getNurseProfile,
} = require("../controllers/getUserProfile");
const {
  updatePharmacistProfile,
  updateDoctorProfile,
  updateAdminProfile,
  updateNurseProfile,
} = require("../controllers/updateUserProfile");
const {
  changePharmacistPassword,
  changeDoctorPassword,
  changeAdminPassword,
  changeNursePassword,
} = require("../controllers/changePassword");
const {
  verifyAdminToken,
  verifyDoctorToken,
  verifyPharmacistToken,
  verifyNurseToken,
} = require("../Middleware/verifyToken");

router.get("/pharmacist", verifyPharmacistToken, getPharmacistProfile);
router.get("/doctor", verifyDoctorToken, getDoctorProfile);
router.get("/admin", verifyAdminToken, getAdminProfile);
router.get("/nurse", verifyNurseToken, getNurseProfile);

router.put("/pharmacist", verifyPharmacistToken, updatePharmacistProfile);
router.put("/doctor", verifyDoctorToken, updateDoctorProfile);
router.put("/admin", verifyAdminToken, updateAdminProfile);
router.put("/nurse", verifyNurseToken, updateNurseProfile);

router.put(
  "/pharmacist/change-password",
  verifyPharmacistToken,
  changePharmacistPassword
);
router.put("/doctor/change-password", verifyDoctorToken, changeDoctorPassword);
router.put("/admin/change-password", verifyAdminToken, changeAdminPassword);
router.put("/nurse/change-password", verifyNurseToken, changeNursePassword);

module.exports = router;
