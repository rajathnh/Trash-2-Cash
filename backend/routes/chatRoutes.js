const express = require("express");
const axios = require("axios");
const { getChatHistory, saveMessage } = require("../utils/chatUtils");
const detectIntent = require("./detect_intent");
const classifyController = require("../controllers/classifyControllers");
const recycleController = require("../controllers/recycleControllers");
const repairController = require("../controllers/repairControllers");
const generalChatController = require("../controllers/generalChatControllers");

const router = express.Router();

// Base URL for your refine-response endpoint
const refineResponseEndpoint = "http://localhost:5000/api/refine-response";

// POST /api/chat - Handles user messages
router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;
    const imageFile = req.files?.image; // Check if an image is uploaded

    console.log("chatRoutes: Received request", { userId, message, imageFile: !!imageFile });

    if (!userId || (!message && !imageFile)) {
      console.error("chatRoutes: Missing userId, message, or image");
      return res.status(400).json({ error: "Missing userId, message, or image" });
    }

    let rawResponse, finalResponse;

    // 🖼️ Handle image uploads with image classification controller.
    if (imageFile) {
      console.log("chatRoutes: Detected image upload, forwarding to image classification.");
      return await classifyController.handleImageClassification(userId, imageFile, res);
    }

    // Retrieve recent conversation history (last 10 messages) and build context.
    const history = await getChatHistory(userId, 10);
    console.log("chatRoutes: Retrieved chat history:", history);
    const conversationContext = history.reduce((acc, msg) => {
      const roleLabel = msg.role === "user" ? "User" : "Assistant";
      return acc + `${roleLabel}: ${msg.content}\n`;
    }, "");
    console.log("chatRoutes: Conversation Context:", conversationContext);

    // Build a full prompt including context and the new message.
    const fullPrompt = `The following is a conversation between a user and an assistant:\n${conversationContext}\nUser: ${message}\nAssistant:`;
    console.log("chatRoutes: Full prompt for Gemini:", fullPrompt);

    // 🔍 Detect intent using just the new message.
    console.log("chatRoutes: Calling detectIntent with message:", message);
    const intentData = await detectIntent(message);
    console.log("chatRoutes: Raw intentData:", intentData);

    // Destructure intent data with defaults.
    const { intent = "unknown", item_name = "", details = "", condition = "" } = intentData;
    const effectiveDetails = details || item_name;
    console.log("chatRoutes: Detected intent:", intent, "with effectiveDetails:", effectiveDetails);

    // 🎯 Route the request based on the detected intent.
    switch (intent) {
      case "classify_e_waste":
        console.log("chatRoutes: Routing to classifyController for text classification.");
        rawResponse = await classifyController.handleTextClassification(userId, effectiveDetails);
        break;
      case "recycling_guidance":
        console.log("chatRoutes: Routing to recycleController for recycling query.");
        rawResponse = await recycleController.handleRecyclingQuery(userId, effectiveDetails);
        break;
      case "repair_advice":
        console.log("chatRoutes: Routing to repairController for repair query.");
        rawResponse = await repairController.handleRepairQuery(userId, effectiveDetails);
        break;
      case "sell_or_donate":
        console.log("chatRoutes: Routing to recycleController for sell or donate query.");
        rawResponse = await recycleController.handleSellOrDonateQuery(userId, effectiveDetails);
        break;
      case "general_chat":
        console.log("chatRoutes: Routing to generalChatController for general chat.");
        // Use full prompt with context for general chat.
        rawResponse = await generalChatController.handleChat(userId, fullPrompt);
        break;
      default:
        console.warn("chatRoutes: Unknown intent detected; using default fallback.");
        rawResponse = "I'm not sure how to respond to that. Can you clarify?";
    }
    console.log("chatRoutes: Raw response from controller:", rawResponse);

    // 🔄 Refine the raw response using the refine-response API endpoint.
    try {
      console.log("chatRoutes: Sending raw response to refine-response endpoint...");
      const { data } = await axios.post(refineResponseEndpoint, {
        rawMessage: rawResponse,
      });
      finalResponse = data.refinedMessage;
      console.log("chatRoutes: Final refined response received:", finalResponse);
    } catch (refineError) {
      console.error("Error calling refine-response endpoint:", refineError.response?.data || refineError.message);
      // Fallback to rawResponse if refinement fails.
      finalResponse = rawResponse;
    }

    // 💾 Save the user message and final assistant response to chat history.
    console.log("chatRoutes: Saving user message and final response to chat history.");
    await saveMessage(userId, "user", message);
    await saveMessage(userId, "assistant", finalResponse);

    res.json({ response: finalResponse });
  } catch (error) {
    console.error("Chat Processing Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
