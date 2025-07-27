export const BASE_URL = "http://localhost:8000";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Signup 
    LOGIN: "/api/auth/login", // Authenticate user & return JWT token
    VERIFY_OTP: "/api/auth/verify-otp", // Verify OTP
    FORGOT_PASSWORD: "/api/auth/forgot-password", // Forgot Password
    RESET_PASSWORD: (token) => `/api/auth/reset-password/${token}`, // Reset Password
    GET_PROFILE: "/api/auth/profile", // Get logged-in user details
    UPDATE_PROFILE: "/api/auth/profile", // Update logged-in user details
    CHANGE_PASSWORD: "/api/auth/change-password", // Change user password
    SEND_EMAIL_OTP: "/api/auth/send-email-otp", // Send OTP for email verification
    VERIFY_EMAIL_OTP: "/api/auth/verify-email-otp", // Verify OTP for email change
  },

  RESUME: {
    CREATE: "/api/resume",               // POST - Create a new resume
    GET_ALL: "/api/resume",              // GET - Get all resumes of logged-in user
    GET_BY_ID: (id) => `/api/resume/${id}`, // GET - Get a specific resume
    UPDATE: (id) => `/api/resume/${id}`,    // PUT - Update a resume
    DELETE: (id) => `/api/resume/${id}`,    // DELETE - Delete a resume
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,    // PUT - Upload Thumbnail and Resume profile img
  },

  IMAGE: {
    UPLOAD_IMAGE: "api/auth/upload-image",
  },
};
