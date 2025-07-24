const Enrollment = require("../models/Enrollment");
const { validationResult } = require("express-validator");

exports.enroll = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {
      name,
      email,
      phone,
      experience,
      schedule,
      message,
      programId,
      programTitle,
      programPrice
    } = req.body;
    const enrollment = new Enrollment({
      name,
      email,
      phone,
      experience,
      schedule,
      message,
      programId,
      programTitle,
      programPrice
    });
    await enrollment.save();
    res.status(201).json({ message: "Enrollment successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
