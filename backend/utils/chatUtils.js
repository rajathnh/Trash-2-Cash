const ChatHistory = require("../models/ChatHistory");

// Retrieve last X messages for a user (default: last 10 messages)
async function getChatHistory(userId, limit = 10) {
  // Optionally, ensure messages are sorted by timestamp (ascending)
  const chat = await ChatHistory.findOne({ userId }).sort({ "messages.timestamp": 1 });
  return chat ? chat.messages.slice(-limit) : [];
}

// Save a message (text or image) in chat history
async function saveMessage(userId, role, content, imageUrl = null) {
  let chat = await ChatHistory.findOne({ userId });

  if (!chat) {
    chat = new ChatHistory({ userId, messages: [] });
  }

  chat.messages.push({ role, content, imageUrl });

  // Keep only the last 10 messages to optimize storage
  chat.messages = chat.messages.slice(-10);

  await chat.save();
}

module.exports = { getChatHistory, saveMessage };
