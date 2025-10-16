const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    images: { type: [String], default: [] },
    publishedAt: { type: Date, default: Date.now },
    author: { type: String, default: "SkillTwin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);


