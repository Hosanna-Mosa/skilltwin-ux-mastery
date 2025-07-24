const ServiceInquiry = require("../models/ServiceInquiry");

exports.submitServiceInquiry = async (req, res) => {
  try {
    const { name, email, phone, serviceId, serviceTitle, servicePricing } = req.body;
    if (!name || !email || !phone || !serviceId || !serviceTitle || !servicePricing) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const inquiry = new ServiceInquiry({ name, email, phone, serviceId, serviceTitle, servicePricing });
    await inquiry.save();
    res.status(201).json({ message: "Inquiry received!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}; 