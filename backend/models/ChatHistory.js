const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Unique identifier for the user
  systemMessage: { 
    content: { type: String, required: false },
    timestamp: { type: Date, default: Date.now }
  },
  messages: [
    {
      role: { type: String, enum: ["user", "assistant", "system"], required: true }, // Who sent the message
      content: { type: String, required: false }, // Text content (if applicable)
      imageData: { type: String, required: false }, // Base64 image data (if applicable)
      timestamp: { type: Date, default: Date.now } // Message timestamp
    }
  ]
});

// Limit stored messages to the last X (adjustable)
chatSchema.pre("save", function (next) {
  const MAX_HISTORY = 50; // Store last 10 messages per user
  if (this.messages.length > MAX_HISTORY) {
    // Preserve system message if it exists
    const systemMessage = this.messages.find(msg => msg.role === "system");
    
    // Slice the last MAX_HISTORY messages, excluding system message
    const regularMessages = this.messages
      .filter(msg => msg.role !== "system")
      .slice(-MAX_HISTORY);
    
    // If system message exists, add it back to the beginning
    if (systemMessage) {
      this.messages = [systemMessage, ...regularMessages];
    } else {
      this.messages = regularMessages;
    }
  }
  next();
});

module.exports = mongoose.model("ChatHistory", chatSchema);