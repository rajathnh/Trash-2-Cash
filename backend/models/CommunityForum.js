const mongoose = require("mongoose");

const forumMessageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String }, // optional field for image URL
    timestamp: { type: Date, default: Date.now },
  });
  

module.exports = mongoose.model("ForumMessage", forumMessageSchema);
