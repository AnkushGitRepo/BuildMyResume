const express = require("express");
const { registerUser, verifyOtp, loginUser, getUserProfile, forgotPassword, resetPassword, updateProfile, changePassword, sendEmailOtp, verifyEmailOtp } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();
const jsonParser = express.json();

// Auth Routes
router.post("/register", jsonParser, registerUser);
router.post("/verify-otp", jsonParser, verifyOtp);
router.post("/login", jsonParser, loginUser);
router.post("/forgot-password", jsonParser, forgotPassword);
router.put("/reset-password/:token", jsonParser, resetPassword);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("profileImage"), updateProfile);
router.post("/change-password", protect, jsonParser, changePassword);
router.post("/send-email-otp", protect, jsonParser, sendEmailOtp);
router.post("/verify-email-otp", protect, jsonParser, verifyEmailOtp);

module.exports = router;