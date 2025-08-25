const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  contactNumber: { type: String, required: false },
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
