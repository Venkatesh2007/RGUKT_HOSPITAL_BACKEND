const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  treatedBy: { type: String, required: false },
  medicineIssuedBy: { type: String, required: false },
  nursingStationBy: { type: String, required: false },
  treatmentDate: { type: Date, required: true },
  reason: { type: String, required: false },
  description: { type: String, required: false },
  temperature: { type: String, required: false },
  bloodPressure: { type: String, required: false },
  pulseRate: { type: String, required: false },
  weight: { type: String, required: false },
  ecg: { type: String, required: false },
  spo2: { type: String, required: false },
  labTest: { type: String, required: false },
  drugallergy: { type: String, required: false },
  advice: { type: String, required: false },
  medicinesWritten: { type: Array, required: false },
  patientType: { type: String, defaultValue: "OP" },
  medicineDisposed: { type: String, required: false },
  status: { type: String, required: true },
});

const Treatments = mongoose.model("treatments", treatmentSchema);

module.exports = Treatments;
