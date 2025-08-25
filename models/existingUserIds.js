const mongoose = require("mongoose");

const existingUserIdsSchema = mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, required: true },
});

const ExistingUserIds = mongoose.model(
  "existingUserIds",
  existingUserIdsSchema
);

module.exports = ExistingUserIds;
