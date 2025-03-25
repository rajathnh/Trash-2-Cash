const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Unique identifier for the user
  messages: [
    {
      role: { type: String, enum: ["user", "assistant"], required: true }, // Who sent the message
      content: { type: String, required: false }, // Text content (if applicable)
      imageData: { type: String, required: false }, // Base64 image data (if applicable)
      timestamp: { type: Date, default: Date.now } // Message timestamp
    }
  ]
});

// Limit stored messages to the last X (adjustable)
chatSchema.pre("save", function (next) {
  const MAX_HISTORY = 10; // Store last 10 messages per user
  if (this.messages.length > MAX_HISTORY) {
    this.messages = this.messages.slice(-MAX_HISTORY);
  }
  next();
});

module.exports = mongoose.model("ChatHistory", chatSchema);
