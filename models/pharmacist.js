const mongoose = require("mongoose");

const pharmacistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: false },
  contactNumber: { type: String, required: false },
});

const Pharmacist = mongoose.model("pharmacist", pharmacistSchema);

module.exports = Pharmacist;
