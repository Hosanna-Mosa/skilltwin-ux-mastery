const express = require("express");
const { submitServiceInquiry } = require("../controllers/serviceInquiryController");

const router = express.Router();

router.post("/", submitServiceInquiry);

module.exports = router; 