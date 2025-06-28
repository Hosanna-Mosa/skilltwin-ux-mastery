const express = require("express");
const { adminLogin } = require("../controllers/adminAuthController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  adminLogin
);

module.exports = router;
