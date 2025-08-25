const express = require("express");
const router = express.Router();
const createNewTreatment = require("../controllers/createNewTreatment");
const treatmentUpdateByDoctor = require("../controllers/treatmentUpdateByDoctor");
const treatmentUpdateByNurse = require("../controllers/treatmentUpdateByNurse");
const treatmentUpdateByPharmacist = require("../controllers/treatmentUpdateByPharmacist");
const getPatientForDoctors = require("../controllers/getPatientForDoctor");
const getPatientsForNurse = require("../controllers/getPatientsForNurse");
const getPatientsForPharmacist = require("../controllers/getPatientsForPharmacist");
const getPatientsForAdmin = require("../controllers/getPatientsForAdmin");
const {
  verifyAdminToken,
  verifyDoctorToken,
  verifyPharmacistToken,
  verifyNurseToken,
} = require("../Middleware/verifyToken");

router.post("/", verifyNurseToken, createNewTreatment);

router.put(
  "/doctor-update/:treatmentId",
  verifyDoctorToken,
  treatmentUpdateByDoctor
);

router.put(
  "/nurse-update/:treatmentId",
  verifyNurseToken,
  treatmentUpdateByNurse
);

router.put(
  "/pharmacist-update/:treatmentId",
  verifyPharmacistToken,
  treatmentUpdateByPharmacist
);

router.get("/doctor", verifyDoctorToken, getPatientForDoctors);

router.get("/nurse", verifyNurseToken, getPatientsForNurse);

router.get("/pharmacist", verifyPharmacistToken, getPatientsForPharmacist);

router.get("/admin", verifyAdminToken, getPatientsForAdmin);

module.exports = router;
