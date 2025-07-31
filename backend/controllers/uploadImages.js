const Resume = require("../models/Resume");
const upload = require("../middlewares/uploadMiddleware");

const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: 'thumbnail' }, { name: 'profileImage' }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

      if (!resume) {
        return res.status(404).json({ message: "Resume not found or unauthorized" });
      }

      const newThumbnail = req.files.thumbnail?.[0];
      const newProfileImage = req.files.profileImage?.[0];

      if (newThumbnail) {
        resume.thumbnailLink = newThumbnail.path;
      }

      if (newProfileImage) {
        resume.profileInfo.profilePreviewUrl = newProfileImage.path;
      }

      await resume.save();

      res.status(200).json({
        message: "Images uploaded successfully",
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
      });
    });
  } catch (err) {
    console.error("Error uploading images:", err);
    res.status(500).json({ message: "Failed to upload images", error: err.message });
  }
};

module.exports = { uploadResumeImages };