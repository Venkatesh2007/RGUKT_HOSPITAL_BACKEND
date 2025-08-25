const { Treatments } = require("../models");

const getPatientsForNurse = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (studentId) {
      const treatments = await Treatments.find({
        studentId,
        $or: [{ status: "PENDING" }, { status: "ISSUE_MEDICINE" }],
      });
      res.status(200).json({ treatments });
    } else {
      // Corrected part
      const treatments = await Treatments.find({
        $or: [{ status: "PENDING" }, { status: "ISSUE_MEDICINE" }],
      });
      res.status(200).send({ treatments });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getPatientsForNurse;
