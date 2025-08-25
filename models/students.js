const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  DOB: { type: Date, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: false },
  contactNumber: { type: String, required: false },
  parentName: { type: String, required: false },
  parentContactNumber: { type: String, required: false },
  longTermDiseases: { type: String, required: false },
});

const Students = mongoose.model("students", studentSchema);

module.exports = Students;
