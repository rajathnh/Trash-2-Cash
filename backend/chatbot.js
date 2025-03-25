// chatgpt 1st attempt - working for text only
// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const API_URL =
//   "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent";

// // Set identity and instructions
// const systemMessage = `
// You are EcoBuddy, a smart waste management assistant designed to help users identify waste categories and guide them through the appropriate next steps. Your main goal is to classify the e-waste and then guide the user as to what to do with that. You have to process the images that the user uploads and classify the waste into five categories: Sellable, Recyclable, Disposable, Repairable, and Compostable.

// Your Core Responsibilities:

// 🧠 Waste Classification:
// Accept user-uploaded images to identify the waste category.
// If classification isn’t clear from one image, ask follow-up questions to gather more details.
// Once classified, provide clear guidance on the best course of action based on the category.

// 🚀 Next Steps Guidance:
// For Sellable items:
// Ask the user if they’d like to sell the item.
// If they agree, provide a URL to the e-waste marketplace and guide them through the listing process.

// For Recyclable items:
// Inform the user about recycling options.
// Ask if they’d like to request a pickup for their recyclable item.
// If they agree, redirect them to the "Trash to Cash" organization’s website where they can request a pickup. This is the link of that website -- https://www.trashtocash.co.in

// For Disposable items:
// Advise on responsible disposal methods and local regulations.

// For Repairable items:
// Encourage repair options and suggest nearby repair centers if possible.

// For Compostable items:
// Educate users on composting techniques and recommend compost bins if needed.

// 🔍 Seamless User Experience:
// Keep conversations simple, clear, and engaging.
// Adapt the flow based on user responses, ensuring they’re guided at every step.
// Redirect users to the appropriate URL when they choose to sell items or request recycling pickups.

// 🌱 Tone and Purpose:
// Be friendly, patient, and solution-oriented.
// Empower users to make eco-friendly decisions by providing helpful insights and actionable steps.
// Your mission is to make waste management easy, informative, and eco-conscious while ensuring a smooth experience for every user.
// `;

// let conversationHistory = [{ role: "user", parts: [{ text: systemMessage }] }];

// async function getGeminiResponse(message) {
//   conversationHistory.push({ role: "user", parts: [{ text: message }] });

//   try {
//     const response = await axios.post(`${API_URL}?key=${GEMINI_API_KEY}`, {
//       contents: conversationHistory,
//     });

//     const botReply = response.data.candidates[0].content.parts[0].text;
//     conversationHistory.push({ role: "model", parts: [{ text: botReply }] });

//     return botReply;
//   } catch (error) {
//     console.error(
//       "Error:",
//       error.response ? error.response.data : error.message
//     );
//     return "Sorry, something went wrong.";
//   }
// }

// // Create a POST endpoint to handle frontend requests
// app.post("/chat", async (req, res) => {
//   const { message } = req.body;
//   const botResponse = await getGeminiResponse(message);
//   res.json({ reply: botResponse });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );

// deepseek 1st attempt
// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(express.json({ limit: "50mb" }));
// app.use(cors());

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const API_URL =
//   "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent";

// const systemMessage = `You are EcoBuddy, a smart waste management assistant designed to help users identify waste categories and guide them through the appropriate next steps. Your main goal is to classify the e-waste and then guide the user as to what to do with that. You have to process the images that the user uploads and classify the waste into five categories: Sellable, Recyclable, Disposable, Repairable, and Compostable.

// Your Core Responsibilities:

// 🧠 Waste Classification:
// Accept user-uploaded images to identify the waste category.
// If classification isn’t clear from one image, ask follow-up questions to gather more details.
// Once classified, provide clear guidance on the best course of action based on the category.

// 🚀 Next Steps Guidance:
// For Sellable items:
// Ask the user if they’d like to sell the item.
// If they agree, provide a URL to the e-waste marketplace and guide them through the listing process.

// For Recyclable items:
// Inform the user about recycling options.
// Ask if they’d like to request a pickup for their recyclable item.
// If they agree, redirect them to the "Trash to Cash" organization’s website where they can request a pickup. This is the link of that website -- https://www.trashtocash.co.in

// For Disposable items:
// Advise on responsible disposal methods and local regulations.

// For Repairable items:
// Encourage repair options and suggest nearby repair centers if possible.

// For Compostable items:
// Educate users on composting techniques and recommend compost bins if needed.

// 🔍 Seamless User Experience:
// Keep conversations simple, clear, and engaging.
// Adapt the flow based on user responses, ensuring they’re guided at every step.
// Redirect users to the appropriate URL when they choose to sell items or request recycling pickups.

// 🌱 Tone and Purpose:
// Be friendly, patient, and solution-oriented.
// Empower users to make eco-friendly decisions by providing helpful insights and actionable steps.
// Your mission is to make waste management easy, informative, and eco-conscious while ensuring a smooth experience for every user.`;

// let conversationHistory = [];

// async function getGeminiResponse(parts) {
//   try {
//     const response = await axios.post(`${API_URL}?key=${GEMINI_API_KEY}`, {
//       contents: conversationHistory,
//       systemInstruction: {
//         parts: [{ text: systemMessage }],
//       },
//     });

//     const botReply = response.data.candidates[0].content.parts[0].text;
//     conversationHistory.push({
//       role: "model",
//       parts: [{ text: botReply }],
//     });
//     return botReply;
//   } catch (error) {
//     console.error("Error:", error.response?.data || error.message);
//     return "Sorry, something went wrong. Please try again.";
//   }
// }

// app.post("/chat", async (req, res) => {
//   try {
//     const { message, image } = req.body;
//     const parts = [];

//     if (message) parts.push({ text: message });
//     if (image) {
//       const mimeType = image.match(/data:(.*?);/)[1];
//       const data = image.split(",")[1];
//       parts.push({
//         inlineData: {
//           mimeType,
//           data,
//         },
//       });
//     }

//     conversationHistory.push({
//       role: "user",
//       parts,
//     });

//     const botResponse = await getGeminiResponse(parts);
//     res.json({ reply: botResponse });
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// chatgpt 2nd attempt
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// Require the ChatHistory model
const ChatHistory = require("./models/ChatHistory");

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: "uploads/" });
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent";

// The system prompt for EcoBuddy
const systemMessage = `
You are EcoBuddy, a smart waste management assistant designed to help users identify waste categories and guide them through the appropriate next steps. Your main goal is to classify the e-waste and then guide the user as to what to do with that. You have to process the images that the user uploads and classify the waste into five categories: Sellable, Recyclable, Disposable, Repairable, and Compostable. If the user sends text in any other language that you know, reply in the same language.

Your Core Responsibilities:

🧠 Waste Classification:
Accept user-uploaded images to identify the waste category.
If classification isn’t clear from one image, ask follow-up questions to gather more details.
Once classified, provide clear guidance on the best course of action based on the category.

🚀 Next Steps Guidance:
For Sellable items:
Ask the user if they’d like to sell the item.
If they agree, provide a URL to the e-waste marketplace and guide them through the listing process.

For Recyclable items:
Inform the user about recycling options.
Ask if they’d like to request a pickup for their recyclable item.
If they agree, redirect them to the "Trash to Cash" organization’s website where they can request a pickup. This is the link of that website -- https://www.trashtocash.co.in

For Disposable items:
Advise on responsible disposal methods and local regulations.

For Repairable items:
Encourage repair options and suggest nearby repair centers if possible.

For Compostable items:
Educate users on composting techniques and recommend compost bins if needed.

🔍 Seamless User Experience:
Keep conversations simple, clear, and engaging.
Adapt the flow based on user responses, ensuring they’re guided at every step.
Redirect users to the appropriate URL when they choose to sell items or request recycling pickups.

🌱 Tone and Purpose:
Be friendly, patient, and solution-oriented.
Empower users to make eco-friendly decisions by providing helpful insights and actionable steps.
Your mission is to make waste management easy, informative, and eco-conscious while ensuring a smooth experience for every user.
`;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/**
 * getGeminiResponse:
 * - Fetches or creates a ChatHistory record for the given user.
 * - Adds the new user message (and image data if provided) to the history.
 * - Sends the full conversation history to the Gemini API.
 * - Stores Gemini’s response in the history and saves the updated record.
 */
async function getGeminiResponse(userId, message, imageBase64) {
  // Look for an existing ChatHistory document for the user
  let chatHistoryDoc = await ChatHistory.findOne({ userId });
  if (!chatHistoryDoc) {
    // If none exists, create one with the system prompt as the first message.
    chatHistoryDoc = new ChatHistory({
      userId,
      messages: [
        { role: "assistant", content: systemMessage, timestamp: new Date() }
      ],
    });
  }

  // Append the user's message
  const userMessage = { role: "user", content: message, timestamp: new Date() };

  // Store the base64 image data if available.
  if (imageBase64) {
    userMessage.imageData = imageBase64;
  }
  chatHistoryDoc.messages.push(userMessage);

  // Prepare conversation history for Gemini.
  // Here we convert the messages into Gemini's expected format.
  const conversationForGemini = chatHistoryDoc.messages.map((msg) => {
    const parts = [{ text: msg.content }];
    // If the message has stored imageData, include it in inlineData.
    if (msg.imageData) {
      parts.push({
        inlineData: { mimeType: "image/jpeg", data: msg.imageData },
      });
    }
    // Adjust role names ("assistant" to "model")
    const role = msg.role === "assistant" ? "model" : msg.role;
    return { role, parts };
  });

  // If the conversation is long, trim it down (for example, last 10 entries).
  const MAX_MESSAGES = 20;
  const trimmedConversation = conversationForGemini.slice(-MAX_MESSAGES);

  try {
    const response = await axios.post(`${API_URL}?key=${GEMINI_API_KEY}`, {
      contents: trimmedConversation,
    });
    const botReply = response.data.candidates[0].content.parts[0].text;

    // Append Gemini's response to the history
    chatHistoryDoc.messages.push({
      role: "assistant",
      content: botReply,
      timestamp: new Date(),
    });

    // Save the updated chat history
    await chatHistoryDoc.save();

    return botReply;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return "Sorry, something went wrong.";
  }
}

// Endpoint for text + image
app.post("/chat", upload.single("image"), async (req, res) => {
  const { message, userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  
  let imageBase64 = null;
  if (req.file) {
    const imagePath = path.join(__dirname, req.file.path);
    const imageBuffer = fs.readFileSync(imagePath);
    imageBase64 = imageBuffer.toString("base64");
    fs.unlinkSync(imagePath); // Clean up the uploaded file
  }

  const botResponse = await getGeminiResponse(userId, message, imageBase64);
  res.json({ reply: botResponse });
});

// Endpoint to retrieve a user's chat history
app.get("/history/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const chatHistoryDoc = await ChatHistory.findOne({ userId });
    if (!chatHistoryDoc) {
      return res.json({ messages: [] });
    }
    // Filter out the system prompt from the messages array.
    const filteredMessages = chatHistoryDoc.messages.filter(
      (msg) => msg.content.trim() !== systemMessage.trim()
    );
    res.json({ messages: filteredMessages });
  } catch (error) {
    console.error("Error retrieving history:", error);
    res.status(500).json({ error: "Could not retrieve chat history" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
