const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batchNo: { type: String, required: false },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  importDate: { type: Date, required: true },
});

const Medicines = mongoose.model("medicines", medicineSchema);

module.exports = Medicines;
