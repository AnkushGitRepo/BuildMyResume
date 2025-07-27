const express = require("express");
const { registerUser, verifyOtp, loginUser, getUserProfile, forgotPassword, resetPassword, updateProfile, changePassword, sendEmailOtp, verifyEmailOtp, upload } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);   // Register User (sends OTP)
router.post("/verify-otp", verifyOtp);     // Verify OTP and complete registration
router.post("/login", loginUser);         // Login User
router.post("/forgot-password", forgotPassword); // Forgot Password
router.put("/reset-password/:token", resetPassword); // Reset Password
router.get("/profile", protect, getUserProfile);  // Get User Profile
router.put("/profile", protect, upload.single("profileImage"), updateProfile); // Update User Profile
router.post("/change-password", protect, changePassword); // Change User Password
router.post("/send-email-otp", protect, sendEmailOtp); // Send OTP for email verification
router.post("/verify-email-otp", protect, verifyEmailOtp); // Verify OTP for email change

module.exports = router;
