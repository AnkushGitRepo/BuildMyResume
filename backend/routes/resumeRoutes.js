const express = require("express");
const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");
const { protect } = require("../middlewares/authMiddleware");
const { uploadResumeImages } = require("../controllers/uploadImages");

const router = express.Router();
const jsonParser = express.json();

router.post("/", protect, jsonParser, createResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, jsonParser, updateResume);
router.put("/:id/upload-images", protect, uploadResumeImages);
router.delete("/:id", protect, deleteResume);

module.exports = router;