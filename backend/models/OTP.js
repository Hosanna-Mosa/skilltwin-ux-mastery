const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 }, // Automatically delete expired documents
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create index for automatic cleanup of expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("OTP", otpSchema);
