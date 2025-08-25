const { Treatments } = require("../models");

const getPatientsForAdmin = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ message: "Date query parameter is required" });
    }

    const treatmentDate = new Date(date);
    treatmentDate.setUTCHours(0, 0, 0, 0);

    const startDate = new Date(treatmentDate);
    const endDate = new Date(treatmentDate);
    endDate.setUTCHours(23, 59, 59, 999);

    const treatments = await Treatments.find({
      treatmentDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.status(200).json({ treatments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getPatientsForAdmin;
