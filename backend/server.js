require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const express = require("express");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cors = require("cors");
const path = require("path");
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const resumeRoutes = require('./routes/resumeRoutes')

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect Database
connectDB();

// Middleware



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));