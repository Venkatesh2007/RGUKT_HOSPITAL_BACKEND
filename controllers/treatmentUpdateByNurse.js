const { Treatments } = require("../models");

const treatmentUpdateByNurse = async (req, res) => {
  try {
    const {
      spo2,
      ecg,
      temperature,
      weight,
      pulseRate,
      bloodPressure,
      patientType,
    } = req.body;
    const { treatmentId } = req.params;
    await Treatments.findByIdAndUpdate(
      { _id: treatmentId },
      {
        $set: {
          spo2,
          ecg,
          temperature,
          weight,
          pulseRate,
          bloodPressure,
          patientType,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = treatmentUpdateByNurse;
