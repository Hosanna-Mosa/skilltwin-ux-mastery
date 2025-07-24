const mongoose = require("mongoose");

const serviceInquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceId: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  servicePricing: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ServiceInquiry", serviceInquirySchema); 
