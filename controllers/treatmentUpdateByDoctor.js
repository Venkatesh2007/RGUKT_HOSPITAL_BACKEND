const { Treatments } = require("../models");

const treatmentUpdateByDoctor = async (req, res) => {
  try {
    const { user } = req;
    const {
      reason,
      description,
      labTest,
      drugallergy,
      advice,
      hopi,
      medicinesWritten,
      review,
      medicineDisposed,
    } = req.body;
    const { treatmentId } = req.params;
    await Treatments.findByIdAndUpdate(
      { _id: treatmentId },
      {
        $set: {
          reason,
          description,
          labTest,
          drugallergy,
          advice,
          hopi,
          medicinesWritten,
          review,
          medicineDisposed,
          treatedBy: user,
          status: "ISSUE_MEDICINE",
        },
      }
    );
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = treatmentUpdateByDoctor;
