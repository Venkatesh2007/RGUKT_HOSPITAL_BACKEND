const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: false },
  contactNumber: { type: String, required: false },
});

const Nurse = mongoose.model("nurse", nurseSchema);

module.exports = Nurse;
