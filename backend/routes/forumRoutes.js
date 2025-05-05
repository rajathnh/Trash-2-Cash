const express = require("express");
const ForumMessage = require("../models/CommunityForum");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for media uploads
const upload = multer({ 
  dest: "uploads/",
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
  }
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// POST /api/forum - Save new forum message with optional media
router.post("/", upload.single("media"), async (req, res) => {
  try {
    const { userId, userName, message } = req.body;
    
    if (!userId || !userName) {
      return res.status(400).json({ error: "Missing userId or userName" });
    }

    if (!message && !req.file) {
      return res.status(400).json({ error: "Message or media is required" });
    }

    let mediaUrl = null;
    let mediaType = null;

    if (req.file) {
      try {
        const filePath = path.join(__dirname, '..', req.file.path);
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "forum_media",
          resource_type: "auto"
        });
        
        mediaUrl = result.secure_url;
        mediaType = result.resource_type;
        
        // For video files, optimize delivery URL
        if (mediaType === 'video') {
          mediaUrl = mediaUrl.replace('/upload/', '/upload/q_auto,f_auto/');
        }

        fs.unlinkSync(filePath);
      } catch (uploadError) {
        if (req.file) fs.unlinkSync(req.file.path);
        throw uploadError;
      }
    }

    const forumMessage = new ForumMessage({ 
      userId, 
      userName, 
      message, 
      mediaUrl,
      mediaType
    });

    await forumMessage.save();
    res.status(201).json({ 
      message: "Message posted successfully", 
      data: forumMessage 
    });

  } catch (error) {
    console.error("Error saving forum message:", error);
    const statusCode = error.message.includes('allowed') ? 400 : 500;
    res.status(statusCode).json({ 
      error: error.message || "Internal server error" 
    });
  }
});

// GET /api/forum - Retrieve all messages with backward compatibility
// Update GET endpoint
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      ForumMessage.find({})
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ForumMessage.countDocuments()
    ]);

    const hasMore = total > (page * limit);
    
    res.json({ 
      messages: messages.map(msg => ({
        ...msg,
        mediaUrl: msg.mediaUrl || msg.imageUrl,
        mediaType: msg.mediaType || (msg.imageUrl ? 'image' : null)
      })),
      hasMore
    });
    
  } catch (error) {
    console.error("Error retrieving forum messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;