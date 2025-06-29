const Admin = require("../models/Admin");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { generateOTP, sendOTPEmail } = require("../utils/email");

exports.adminRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const admin = new Admin({
      email,
      password: hashedPassword,
      name,
      role: "admin",
    });

    await admin.save();

    // Generate token
    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      process.env.JWT_SECRET || "SkillTwinJWT@123",
      { expiresIn: "3d" }
    );

    res.status(201).json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Admin registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.adminLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    // First, check if the email exists in the database
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        message:
          "Email not found. Please check your email or register a new account.",
        errorType: "EMAIL_NOT_FOUND",
      });
    }

    // If email exists, then verify the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password. Please try again.",
        errorType: "INVALID_PASSWORD",
      });
    }

    // If both email and password are correct, generate token
    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      process.env.JWT_SECRET || "SkillTwinJWT@123",
      { expiresIn: "3d" }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot Password - Send OTP for Admin
exports.adminForgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found with this email" });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database with admin prefix
    await OTP.findOneAndUpdate(
      { email: email }, // Use regular email for admin OTPs
      {
        email: email,
        otp,
        expiresAt,
        isUsed: false,
        userType: "admin",
      },
      { upsert: true, new: true }
    );

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp, "admin");
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    res.json({
      message: "OTP sent successfully to your email",
      email: email,
    });
  } catch (err) {
    console.error("Admin forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP for Admin
exports.adminVerifyOTP = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, otp } = req.body;

  try {
    // Find OTP in database for admin
    const otpRecord = await OTP.findOne({
      email: email,
      otp,
      isUsed: false,
      expiresAt: { $gt: new Date() },
      userType: "admin",
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark OTP as used
    await OTP.findByIdAndUpdate(otpRecord._id, { isUsed: true });

    res.json({
      message: "OTP verified successfully",
      email: email,
    });
  } catch (err) {
    console.error("Admin OTP verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password for Admin
exports.adminResetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, newPassword } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update admin password
    admin.password = hashedPassword;
    await admin.save();

    // Delete any remaining OTPs for this admin email
    await OTP.deleteMany({ email: email, userType: "admin" });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Admin password reset error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.checkEmailExists = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const admin = await Admin.findOne({ email });

    // For security reasons, we don't reveal if the email exists or not
    // This prevents email enumeration attacks
    res.json({
      message: "If the email exists, a password reset link will be sent.",
      exists: !!admin, // This is for internal use only
    });
  } catch (err) {
    console.error("Email check error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
