const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    otp: String,
    otpExpires: Date,
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    emailChangeOtp: String,
    emailChangeOtpExpires: Date,
    newEmail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
