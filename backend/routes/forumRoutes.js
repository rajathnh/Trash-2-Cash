const express = require("express");
const ForumMessage = require("../models/CommunityForum");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/forum - Save a new forum message (with optional image)
router.post("/", async (req, res) => {
  try {
    const { userId, userName, message } = req.body;
    if (!userId || !userName || !message) {
      return res.status(400).json({ error: "Missing userId, userName, or message" });
    }

    let imageUrl = null;
    // Check if an image file was uploaded
    if (req.files && req.files.image) {
      const file = req.files.image;
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(file.tempFilePath || file.path, {
        folder: "forum_images",
      });
      imageUrl = result.secure_url;
      // Optionally, remove the local temporary file if using tempFilePath
      if (file.tempFilePath) {
        // fs.unlinkSync(file.tempFilePath);
      }
    }

    const forumMessage = new ForumMessage({ userId, userName, message, imageUrl });
    await forumMessage.save();
    res.status(201).json({ message: "Message saved successfully", data: forumMessage });
  } catch (error) {
    console.error("Error saving forum message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/forum - Retrieve all forum messages (optionally sorted by timestamp)
router.get("/", async (req, res) => {
  try {
    const messages = await ForumMessage.find({}).sort({ timestamp: -1 });
    res.json({ messages });
  } catch (error) {
    console.error("Error retrieving forum messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
