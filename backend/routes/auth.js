const express = require("express");
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  register
);

// Login
router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  login
);

module.exports = router;
