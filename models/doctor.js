const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: false },
  contactNumber: { type: String, required: false },
});

const Doctor = mongoose.model("doctors", doctorSchema);

module.exports = Doctor;
