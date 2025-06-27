const mongoose = require("mongoose");

const sessionLogSchema = new mongoose.Schema({
  enrollmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollment",
    required: true,
  },
  sessionDate: { type: Date, required: true },
  notes: { type: String },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  progress: { type: Number, min: 0, max: 100 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SessionLog", sessionLogSchema);
