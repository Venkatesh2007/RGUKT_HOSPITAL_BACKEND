const { Students } = require("../models");

const getStudentDetails = async (req, res) => {
  try {
    const { studentId } = req.query;
    const studentInfo = await Students.findOne({
      studentId: { $eq: studentId },
    });
    if (!studentInfo) {
      return res.status(404).json({ message: "Student not found!" });
    }
    res.status(200).json({ studentInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStudents = async (req, res) => {
  try {
    const { studentsData } = req.body;
    await Students.insertMany(studentsData);
    res
      .status(200)
      .json({ message: "File uploaded and data stored successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStudentDetails, addStudents };
