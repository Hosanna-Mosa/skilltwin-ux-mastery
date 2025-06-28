const express = require("express");
const { submitInquiry } = require("../controllers/inquiryController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty(),
    body("tech").notEmpty(),
    body("helpType").notEmpty(),
    body("contact").notEmpty(),
  ],
  submitInquiry
);

module.exports = router;
