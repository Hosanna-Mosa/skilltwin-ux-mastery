const express = require("express");
const {
  adminLogin,
  adminRegister,
  checkEmailExists,
  adminForgotPassword,
  adminVerifyOTP,
  adminResetPassword,
} = require("../controllers/adminAuthController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  adminLogin
);

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  adminRegister
);

router.post(
  "/check-email",
  [body("email").isEmail().withMessage("Valid email is required")],
  checkEmailExists
);

// Forgot Password Routes
router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Valid email is required")],
  adminForgotPassword
);

router.post(
  "/verify-otp",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("otp")
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP must be 6 digits"),
  ],
  adminVerifyOTP
);

router.post(
  "/reset-password",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  adminResetPassword
);

module.exports = router;
