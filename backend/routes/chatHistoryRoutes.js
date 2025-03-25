// backend/routes/chatHistory.js
const express = require("express");
const { getChatHistory } = require("../utils/chatUtils");
const router = express.Router();

// GET /api/chat/history?userId=1234
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    const history = await getChatHistory(userId, 10); // get last 10 messages
    res.json({ history });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
