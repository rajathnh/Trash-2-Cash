const express = require("express");
const ForumMessage = require("../models/CommunityForum");
const router = express.Router();

// POST /api/forum - Save a new forum message
router.post("/", async (req, res) => {
  try {
    const { userId, userName, message } = req.body;
    if (!userId || !userName || !message) {
      return res.status(400).json({ error: "Missing userId, userName, or message" });
    }
    const forumMessage = new ForumMessage({ userId, userName, message });
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
