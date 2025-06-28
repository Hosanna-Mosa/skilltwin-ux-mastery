const express = require("express");
const {
  register,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controllers/authController");
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

// Forgot Password - Send OTP
router.post("/forgot-password", [body("email").isEmail()], forgotPassword);

// Verify OTP
router.post(
  "/verify-otp",
  [
    body("email").isEmail(),
    body("otp").isLength({ min: 6, max: 6 }).isNumeric(),
  ],
  verifyOTP
);

// Reset Password
router.post(
  "/reset-password",
  [body("email").isEmail(), body("newPassword").isLength({ min: 6 })],
  resetPassword
);

module.exports = router;
