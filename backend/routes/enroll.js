const express = require("express");
const { enroll } = require("../controllers/enrollController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("training").notEmpty(),
  ],
  enroll
);

module.exports = router;
