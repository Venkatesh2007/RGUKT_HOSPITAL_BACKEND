const express = require("express");
const { Others } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await Others.find({ status: "PENDING" });
    res.status(200).json({ otherTreatments: patients });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, reason, treatmentDate, medicinesWritten } = req.body;
    const newPatient = new Others({
      name,
      reason,
      treatmentDate,
      medicinesWritten,
      status: "PENDING",
    });

    await newPatient.save();
    res.status(201).json({ message: "Treatment Saved Succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:treatmentId", async (req, res) => {
  try {
    const { treatmentId } = req.params;
    const patient = await Others.findByIdAndUpdate(
      treatmentId,
      { status: "TREATED" },
      { new: true }
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Treated Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
