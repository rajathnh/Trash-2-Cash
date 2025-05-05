const mongoose = require("mongoose");

const forumMessageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  message: { type: String }, // Made optional (can have media without text)
  mediaUrl: { type: String }, // Changed from imageUrl to mediaUrl
  mediaType: { type: String, enum: ["image", "video"] }, // New field
  timestamp: { type: Date, default: Date.now },
});

// Add virtual ID field and remove _id and __v from responses
forumMessageSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("ForumMessage", forumMessageSchema);