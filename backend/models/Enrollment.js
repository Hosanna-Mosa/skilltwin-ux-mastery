const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  experience: { type: String, required: true },
  schedule: { type: String },
  message: { type: String },
  programId: { type: String },
  programTitle: { type: String },
  programPrice: { type: String },
  creatpedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
