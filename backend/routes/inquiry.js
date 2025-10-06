const express = require("express");
const { submitInquiry } = require("../controllers/inquiryController");
const Inquiry = require("../models/Inquiry");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("helpType").notEmpty().withMessage("helpType is required"),
    body("tech")
      .custom((value, { req }) => value || req.body.technology)
      .withMessage("technology is required"),
    body("contact")
      .custom((value, { req }) => value || req.body.phone)
      .withMessage("contact/phone is required"),
  ],
  submitInquiry
);

module.exports = router;

// Download endpoint: returns a text version of the inquiry for admins
router.get("/:id/download", async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).send("Not found");
    }
    const lines = [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email || '-'}`,
      `Phone: ${inquiry.contact}`,
      `Technology: ${inquiry.tech}`,
      `Help Type: ${inquiry.helpType}`,
      `Submitted: ${inquiry.createdAt.toISOString()}`,
    ];
    const content = lines.join("\n");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="inquiry-${inquiry._id}.txt"`
    );
    res.send(content);
  } catch (e) {
    res.status(500).send("Server error");
  }
});
