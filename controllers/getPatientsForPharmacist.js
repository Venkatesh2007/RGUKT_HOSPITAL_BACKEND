const { Treatments } = require("../models");

const getPatientsForPharmacist = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (studentId) {
      const treatments = await Treatments.find({
        status: "ISSUE_MEDICINE",
      });
      res.status(200).json({ studentTreatments: treatments });
    } else {
      const treatments = await Treatments.find({
        status: "ISSUE_MEDICINE",
      });
      res.status(200).json({ studentTreatments: treatments });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getPatientsForPharmacist;
