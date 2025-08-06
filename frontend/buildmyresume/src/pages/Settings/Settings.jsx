import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Button";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import "./Settings.css";

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
      setProfileImagePreview(user.profileImageUrl || null);
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
      let profileChanged = false;
      let emailChanged = false;

      if (name !== user.name) {
        formData.append("name", name);
        profileChanged = true;
      }
      if (profileImage) {
        formData.append("profileImage", profileImage);
        profileChanged = true;
      }

      if (email !== originalEmail) {
        emailChanged = true;
        setNewEmail(email);
        setIsEmailModalOpen(true);
        setOtpSent(false);
        setOtp("");
        toast.info("Please verify your new email with the OTP sent.");
        setProfileLoading(false);
        return;
      }

      if (!profileChanged && !emailChanged) {
        toast.info("No changes to update.");
        setProfileLoading(false);
        return;
      }

      if (profileChanged) {
        console.log("Sending profile update request with data:", { name, profileImage });
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
      }
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
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6 bg-gray-100 h-full">
        {/* Forms Section */}
        <div className="w-full bg-white rounded-lg shadow-lg p-6 h-full">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Account Settings</h1>

          {/* Profile Information Section */}
          <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
              Profile Information
            </h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-6 flex justify-center">
                <ProfilePhotoSelector
                  image={profileImage}
                  setImage={setProfileImage}
                  preview={profileImagePreview}
                  setPreview={setProfileImagePreview}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={!isEmailEditable}
                    inputClassName={!isEmailEditable ? "bg-gray-200 cursor-not-allowed" : "bg-white"}
                    onDoubleClick={() => setIsEmailEditable(true)}
                  />
                </div>
              </div>
              <Button
                type="submit"
                onClick={handleProfileUpdate}
                disabled={profileLoading}
                hideArrow={true}
                className="mt-6"
              >
                {profileLoading ? (
                  <LuLoader className="animate-spin text-xl" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          </div>

          {/* Change Password Section */}
          <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
              Change Password
            </h2>
            <form onSubmit={handleChangePassword}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                onClick={handleChangePassword}
                disabled={passwordLoading}
                hideArrow={true}
                className="mt-6"
              >
                {passwordLoading ? (
                  <LuLoader className="animate-spin text-xl" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </div>
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
          <Button
            type="submit"
            onClick={otpSent ? handleVerifyEmailOtp : handleEmailChangeRequest}
            disabled={emailChangeLoading}
            hideArrow={true}
          >
            {emailChangeLoading ? (
              <LuLoader className="animate-spin text-xl" />
            ) : otpSent ? (
              "Verify OTP"
            ) : (
              "Send OTP"
            )}
          </Button>
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
    </DashboardLayout>
  );
};



export default Settings;