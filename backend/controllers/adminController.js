const Inquiry = require("../models/Inquiry");
const Enrollment = require("../models/Enrollment");

exports.getLeads = async (req, res) => {
  try {
    const leads = await Inquiry.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
