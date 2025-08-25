const { Treatments } = require("../models");

const getPatientForDoctors = async (req, res) => {
  try {
    const { status, studentId } = req.query;
    const treatments = await Treatments.find({ status, studentId }).sort({
      treatmentDate: -1,
    });
    res
      .status(200)
      .json({ pendingTreatments: treatments, treatedTreatments: treatments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getPatientForDoctors;
