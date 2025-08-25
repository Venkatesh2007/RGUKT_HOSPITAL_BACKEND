const express = require("express");
const router = express.Router();
const {
  getAvailableMedicines,
  addMedicineStock,
  updateMedicineQuantity,
  deleteMedicines,
} = require("../controllers/medicines");
const getMedicinesForAdmin = require("../controllers/getMedicinesForAdmin");
const {
  verifyAdminToken,
  verifyDoctorToken,
  verifyPharmacistToken,
} = require("../Middleware/verifyToken");

// Medicines API  (gives you the array  of available medicines)
router.get("/", verifyDoctorToken, getAvailableMedicines);

// Adding New Medicine stock to the Database
router.post("/", verifyPharmacistToken, addMedicineStock);

// Reducing medicines from the Database when issued to patients
router.put("/", verifyPharmacistToken, updateMedicineQuantity);

// Getting Medicines Data for Pharmacist to view all medicines in the Database
router.get("/pharmacist", verifyPharmacistToken, getMedicinesForAdmin);

// Getting Medicines for Admin to view all medicines in the Database
router.get("/admin", verifyAdminToken, getMedicinesForAdmin);

//Deleting Medicines which have quantity of 0
deleteMedicines();

module.exports = router;
