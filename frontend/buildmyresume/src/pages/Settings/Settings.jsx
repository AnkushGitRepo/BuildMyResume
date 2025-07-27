import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";
import Navbar from "../../components/layouts/Navbar";

const Settings = () => {
  const { user, updateUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [originalEmail, setOriginalEmail] = useState("");

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailChangeLoading, setEmailChangeLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setOriginalEmail(user.email || "");
      setProfileImagePreview(user.profileImage || null);
    }
  }, [user]);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1500); // Show success modal for 1.5 seconds before reloading
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      console.log("Sending profile update request with data:", { name, profileImage });

      if (email !== originalEmail) {
        setNewEmail(email);
        setIsEmailModalOpen(true);
        setOtpSent(false);
        setOtp("");
        toast.info("Please verify your new email with the OTP sent.");
        return; // Stop here, OTP modal will handle the rest
      }

      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Profile update successful:", response.data);
      updateUser(response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error.response);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password do not match.");
      setPasswordLoading(false);
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleEmailChangeRequest = async (e) => {
    e.preventDefault();
    setEmailChangeLoading(true);
    try {
      await axiosInstance.post(API_PATHS.AUTH.SEND_EMAIL_OTP, { newEmail });
      setOtpSent(true);
      toast.success("OTP sent to your new email address.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setEmailChangeLoading(false);
    }
  };

  const handleVerifyEmailOtp = async (e) => {
    e.preventDefault();
    console.log("handleVerifyEmailOtp called");
    setEmailChangeLoading(true);
    try {
      console.log("Attempting to verify OTP...");
      const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_EMAIL_OTP, {
        newEmail,
        otp,
      });
      console.log("OTP verification successful:", response.data);
      updateUser(response.data);
      toast.success("Email updated successfully!");
      setIsEmailModalOpen(false);
      setOtpSent(false);
      setOtp("");
      setNewEmail("");
      setIsEmailEditable(false);
      setShowSuccessModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify OTP.");
    } finally {
      setEmailChangeLoading(false);
      console.log("Email change loading set to false.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

      {/* Profile Information Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Profile Information
        </h2>
        <form onSubmit={handleProfileUpdate}>
          <div className="mb-6">
            <ProfilePhotoSelector
              image={profileImage}
              setImage={setProfileImage}
              preview={profileImagePreview}
              setPreview={setProfileImagePreview}
            />
          </div>
          <div className="mb-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEmailEditable}
            />
            {!isEmailEditable && (
              <button
                type="button"
                onClick={() => setIsEmailEditable(true)}
                className="text-blue-600 hover:underline text-sm mt-2"
              >
                Edit Email
              </button>
            )}
          </div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={profileLoading}
          >
            {profileLoading ? (
              <LuLoader className="animate-spin text-xl" />
            ) : (
              "Update Profile"
            )}
          </button>
          
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={passwordLoading}
          >
            {passwordLoading ? (
              <LuLoader className="animate-spin text-xl" />
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>

      
    </div>

      {/* Email Change Modal */}
      <Modal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title={otpSent ? "Verify New Email" : "Change Email Address"}
      >
        <form
          onSubmit={otpSent ? handleVerifyEmailOtp : handleEmailChangeRequest}
          className="p-6"
        >
          {!otpSent ? (
            <div className="mb-4">
              <Input
                label="New Email Address"
                type="email"
                placeholder="Enter your new email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
          ) : (
            <div className="mb-4">
              <Input
                label="OTP"
                type="text"
                placeholder="Enter the OTP sent to your new email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={emailChangeLoading}
          >
            {emailChangeLoading ? (
              <LuLoader className="animate-spin text-xl" />
            ) : otpSent ? (
              "Verify OTP"
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success!"
      >
        <div className="p-6 text-center">
          <p className="text-lg text-gray-700">Email updated successfully!</p>
          <p className="text-sm text-gray-500 mt-2">Page will reload shortly.</p>
        </div>
      </Modal>
    </>
  );
};

export default Settings;