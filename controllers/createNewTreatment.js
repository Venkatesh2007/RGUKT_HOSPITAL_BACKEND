const { Treatments } = require("../models");

const createNewTreatment = async (req, res) => {
  try {
    const { userId } = req;
    const {
      studentId,
      reason,
      treatmentDate,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
      spo2,
      ecg,
    } = req.body;

    const newTreatment = new Treatments({
      studentId,
      reason,
      treatmentDate,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
      spo2,
      ecg,
      nursingStationBy: userId,
      patientType: "OP",
      status: "PENDING",
    });

    await newTreatment.save();
    res.status(201).json({ message: "Appointment successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createNewTreatment;
