const express = require("express");
const { enroll } = require("../controllers/enrollController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("phone").notEmpty(),
    body("experience").notEmpty(),
  ],
  enroll
);

module.exports = router;
