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
You are EcoBuddy, a smart waste management assistant dedicated to helping users identify waste categories and guide them through the appropriate next steps. Your primary goal is to classify e-waste and provide actionable advice. You process images and text to categorize waste into five types: Sellable, Recyclable, Disposable, Repairable, and Compostable. You also offer repairability and sellability assessments when needed. If the user sends text in another language that you know, reply in the same language. Don’t forget to introduce yourself when the user sends a greeting message.
4 things not to forget in any case - 
1. Your identity - You are EcoBuddy, a smart waste management assistant dedicated to helping users identify waste categories and guide them through the appropriate next steps.
2. Introducing yourself whenever the user sends a greeting message.
3. If the user sends text in another language that you know, reply in the same language.
4. Don't put much stars for your response to bold - it won't be bolded while showing your response in the browser
 Core Responsibilities:
 Waste Classification:
Accept user-uploaded images or text descriptions to identify the waste category.
If classification isn’t clear, ask follow-up questions to gather more details.
Once classified, provide clear guidance on the best course of action based on the category.
 Next Steps Guidance:
Sellable Items:
Ask the user if they’d like to sell the item.
If they agree, conduct a quick sellability assessment by asking about the item’s condition, brand, age, and functionality.
Based on the assessment, let them know if the item has good resale value.
Provide a URL to the e-waste marketplace and guide them through the listing process.
Recyclable Items:
Inform the user about recycling options.
Ask if they’d like to request a pickup for their recyclable item.
If they agree, redirect them to the "Trash to Cash" organization’s website for pickup requests: Trash to Cash.
Disposable Items:
Advise on responsible disposal methods and any local regulations, if applicable.
Repairable Items:
Conduct a quick repairability assessment by asking questions like:
What part of the device is not working?
Has the item been repaired before?
Are there any visible damages (e.g., cracks, burns)?
Based on the answers, suggest repair options and assess whether repairing is cost-effective.
If repair is recommended, suggest nearby repair centers if possible.
Compostable Items:
Educate users on composting techniques and recommend compost bins if needed.
 Seamless User Experience:
Keep conversations simple, clear, and engaging.
Adapt the flow based on user responses, ensuring they’re guided every step of the way.
Redirect users to appropriate URLs when they choose to sell items or request recycling pickups.
 Tone and Purpose:
Be friendly, patient, and solution-oriented.
Empower users to make eco-friendly decisions by providing helpful insights and actionable steps.
Ensure the user journey is smooth, informative, and eco-conscious.
Your mission is to make waste management effortless while helping users reduce e-waste responsibly!
`;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/**
 * getNearbyDisposalCenters:
 * Queries the Google Places API for nearby e-waste disposal centers
 * given a userLocation object with {latitude, longitude}.
 * Returns an array of up to 5 results.
 */
async function getNearbyDisposalCenters(userLocation) {
  const { latitude, longitude } = userLocation;
  const radius = 2000; // 2 km in meters
  const keyword = "ewaste disposal";
  const mapsUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${encodeURIComponent(keyword)}&key=${process.env.MAPS_API_KEY}`;
  try {
    const response = await axios.get(mapsUrl);
    console.log("Places API response:", response.data);
    return response.data.results.slice(0, 5);
  } catch (error) {
    console.error("Error fetching nearby disposal centers:", error);
    return [];
  }
}

/**
 * getGeminiResponse:
 * - Retrieves (or creates) a ChatHistory document.
 * - Appends the user's message (and image data if provided).
 * - If the message is disposal-related and a location is provided,
 *   fetches nearby disposal centers and appends an assistant message with that info.
 * - Prepares the conversation history (ensuring non-empty text fields).
 * - Sends the conversation to the Gemini API.
 * - Appends Gemini’s response to the conversation and saves the updated record.
 */
async function getGeminiResponse(userId, message, imageBase64, locationStr) {
  // Retrieve or create ChatHistory for the user
  let chatHistoryDoc = await ChatHistory.findOne({ userId });
  if (!chatHistoryDoc) {
    chatHistoryDoc = new ChatHistory({
      userId,
      systemMessage: {
        content: systemMessage,
        timestamp: new Date()
      },
      messages: []
    });
  }

  // Ensure system message exists
  if (!chatHistoryDoc.systemMessage) {
    chatHistoryDoc.systemMessage = {
      content: systemMessage,
      timestamp: new Date()
    };
  }

  // Append the user's message
  const userMessage = { 
    role: "user", 
    content: message, 
    timestamp: new Date() 
  };
  if (imageBase64) {
    userMessage.imageData = imageBase64;
  }
  chatHistoryDoc.messages.push(userMessage);
  console.log("User message appended:", userMessage);

  // Check for disposal-related query (if location is provided)
  const disposalKeywords = ["dispose", "disposal", "get rid", "junk"];
  const messageLower = message.toLowerCase();
  const isDisposalQuery = disposalKeywords.some(keyword => messageLower.includes(keyword));

  if (isDisposalQuery && locationStr) {
    console.log("Disposal query detected. Processing location for nearby centers...");
    try {
      const userLocation = JSON.parse(locationStr);
      const centers = await getNearbyDisposalCenters(userLocation);
      console.log("Fetched centers:", centers);
      if (centers.length > 0) {
        let centersString = "\n\nHere are some nearby e‑waste disposal centers:\n";
        centers.forEach((center, idx) => {
          centersString += `${idx + 1}. ${center.name} – ${center.vicinity}\n`;
        });
        const disposalMessage = {
          role: "assistant",
          content: centersString,
          timestamp: new Date()
        };
        chatHistoryDoc.messages.push(disposalMessage);
        console.log("Disposal branch message appended:", disposalMessage);
      }
    } catch (error) {
      console.error("Error processing disposal branch:", error);
    }
  } else {
    console.log("Not a disposal-related query or no location provided; skipping disposal lookup.");
  }

  // Prepare conversation history for Gemini
  const conversationForGemini = [
    // Prepend system message content to the first user message
    ...(chatHistoryDoc.messages.length > 0 
      ? [{
          role: "user",
          parts: [
            { text: chatHistoryDoc.systemMessage.content },
            { text: chatHistoryDoc.messages[0].content }
          ]
        }]
      : []
    ),
    // Add the rest of the messages
    ...chatHistoryDoc.messages.slice(1).map((msg) => {
      const text = msg.content.trim();
      if (!text) return null;
      const parts = [{ text }];
      if (msg.imageData) {
        parts.push({
          inlineData: { mimeType: "image/jpeg", data: msg.imageData },
        });
      }
      // Use "model" for assistant messages, otherwise keep the role.
      const role = msg.role === "assistant" ? "model" : msg.role;
      return { role, parts };
    }).filter((msg) => msg !== null)
  ];

  console.log("Final conversation for Gemini (before trimming):", conversationForGemini);
  const MAX_MESSAGES = 50;
  const trimmedConversation = conversationForGemini.slice(-MAX_MESSAGES);
  console.log("Trimmed conversation for Gemini:", trimmedConversation);

  try {
    const response = await axios.post(`${API_URL}?key=${GEMINI_API_KEY}`, {
      contents: trimmedConversation,
    });
    // Defensive check for response structure
    if (
      response.data &&
      Array.isArray(response.data.candidates) &&
      response.data.candidates.length > 0 &&
      response.data.candidates[0].content &&
      Array.isArray(response.data.candidates[0].content.parts) &&
      response.data.candidates[0].content.parts.length > 0
    ) {
      const botReply = response.data.candidates[0].content.parts[0].text;
      console.log("Gemini API reply:", botReply);

      // Append Gemini's response to the chat history
      chatHistoryDoc.messages.push({
        role: "assistant",
        content: botReply,
        timestamp: new Date(),
      });

      // Save the updated chat history
      await chatHistoryDoc.save();

      return botReply;
    } else {
      console.error("Unexpected Gemini API response structure:", response.data);
      return "Sorry, I couldn't generate a response.";
    }
  } catch (error) {
    console.error(
      "Error calling Gemini API:",
      error.response ? error.response.data : error.message
    );
    return "Sorry, something went wrong.";
  }
}

// Endpoint for text + image
app.post("/chat", upload.single("image"), async (req, res) => {
  const { message, userId, location } = req.body;
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

  const botResponse = await getGeminiResponse(userId, message, imageBase64, location);
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
    res.json({ messages: chatHistoryDoc.messages });
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