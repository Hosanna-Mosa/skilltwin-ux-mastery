const Inquiry = require("../models/Inquiry");
const { validationResult } = require("express-validator");
const { sendAdminNotificationEmail, buildInquiryEmailTemplate } = require("../utils/email");

exports.submitInquiry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Accept both frontend field naming and backend schema
    const {
      name,
      email,
      technology,
      tech,
      helpType,
      phone,
      contact,
      message,
    } = req.body;

    const payload = {
      name,
      email: email,
      tech: technology || tech,
      helpType,
      contact: phone || contact,
    };

    const inquiry = new Inquiry(payload);
    await inquiry.save();

    // Notify admin by email
    const downloadUrl = `${process.env.PUBLIC_API_BASE || "http://localhost:8000"}/api/inquiry/${inquiry._id}/download`;
    const html = buildInquiryEmailTemplate({
      name: payload.name,
      email: payload.email,
      contact: payload.contact,
      tech: payload.tech,
      helpType: payload.helpType,
      message,
      submittedAt: new Date().toISOString(),
      downloadUrl,
    });
    await sendAdminNotificationEmail("SkillTwin - New Inquiry", html);

    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
