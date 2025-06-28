const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: [{ type: String, required: true }],
  availability: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expert", expertSchema);
