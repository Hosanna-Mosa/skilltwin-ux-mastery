const Inquiry = require("../models/Inquiry");
const { validationResult } = require("express-validator");

exports.submitInquiry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, tech, helpType, contact } = req.body;
    const inquiry = new Inquiry({ name, tech, helpType, contact });
    await inquiry.save();
    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
