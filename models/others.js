const mongoose = require("mongoose");

const othersSchema = mongoose.Schema({
  name: { type: String, required: true },
  reason: { type: String, required: true },
  treatmentDate: { type: Date, required: true },
  medicinesWritten: { type: Array, required: false },
  status: { type: String, required: true },
});

const Others = mongoose.model("others", othersSchema);

module.exports = Others;
