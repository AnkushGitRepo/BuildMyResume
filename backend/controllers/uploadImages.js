const Resume = require("../models/Resume");
const upload = require("../middlewares/uploadMiddleware");

const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "BMR2",
        format: "png",
        public_id: filename,
        resource_type: "image",
        access_mode: "public",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: 'thumbnail' }, { name: 'profileImage' }])(req, res, async (err) => {
      if (err) {
        console.error("MULTER ERROR:", err);
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

      if (!resume) {
        return res.status(404).json({ message: "Resume not found or unauthorized" });
      }

      const newThumbnail = req.files?.thumbnail?.[0];
      const newProfileImage = req.files?.profileImage?.[0];

      try {
        if (newThumbnail) {
          const result = await uploadToCloudinary(
            newThumbnail.buffer,
            newThumbnail.originalname.split(".")[0] + "-" + Date.now()
          );
          resume.thumbnailLink = result.secure_url;
        }

        if (newProfileImage) {
          const result = await uploadToCloudinary(
            newProfileImage.buffer,
            newProfileImage.originalname.split(".")[0] + "-" + Date.now()
          );
          resume.profileInfo.profilePreviewUrl = result.secure_url;
        }

        await resume.save();

        res.status(200).json({
          message: "Images uploaded successfully",
          thumbnailLink: resume.thumbnailLink,
          profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
        });

      } catch (uploadErr) {
        console.error("CLOUDINARY UPLOAD ERROR:", uploadErr);
        return res.status(500).json({ message: "Cloudinary upload failed", error: uploadErr.message });
      }
    });
  } catch (err) {
    console.error("Error uploading images:", err);
    res.status(500).json({ message: "Failed to upload images", error: err.message });
  }
};

module.exports = { uploadResumeImages };