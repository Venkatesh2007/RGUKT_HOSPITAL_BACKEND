const express = require("express");
const { Treatments } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
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

    const data = await Treatments.aggregate([
      {
        $match: {
          treatmentDate: { $gte: startDate, $lte: endDate },
          status: "TREATED",
        },
      },
      {
        $facet: {
          patientTypeCounts: [
            {
              $group: {
                _id: "$patientType",
                count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: null,
                ipCount: {
                  $sum: {
                    $cond: [{ $eq: ["$_id", "IP"] }, "$count", 0],
                  },
                },
                opCount: {
                  $sum: {
                    $cond: [{ $eq: ["$_id", "OP"] }, "$count", 0],
                  },
                },
              },
            },
          ],
          reasonCounts: [
            {
              $group: {
                _id: "$reason",
                count: { $sum: 1 },
              },
            },
            {
              $sort: { count: -1 },
            },
            {
              $limit: 5,
            },
            {
              $project: {
                _id: 0,
                reason: "$_id",
                count: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          ipCount: { $arrayElemAt: ["$patientTypeCounts.ipCount", 0] },
          opCount: { $arrayElemAt: ["$patientTypeCounts.opCount", 0] },
          reasons: "$reasonCounts",
        },
      },
    ]);

    res.status(200).json({ summary: data[0] });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
