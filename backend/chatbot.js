require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
const multer = require("multer");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cors = require('cors');
const allowedOrigins = [
  'http://localhost:3000',   // Local frontend
  'http://localhost:5000',   // Local backend (if needed for testing)
  'https://trash-2-cash.vercel.app', // Vercel frontend
  'https://trash-2-cash-299208236479.asia-south1.run.app' // Vercel backend
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy: Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Require the ChatHistory model
const ChatHistory = require("./models/ChatHistory");



// app.use(fileUpload({
//   useTempFiles: true, // This creates temporary files for upload, which is useful if you plan to upload to Cloudinary.
//   tempFileDir: '/tmp/', // Optionally specify a temp file directory.
// }));
const forumRoutes = require("./routes/forumRoutes");
const eventRouter = require("./routes/eventRoutes")
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
If they agree, redirect them to the "Trash to Cash" organization’s website for pickup requests: https://www.trashtocash.co.in .
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
app.get("/", (req, res) => res.send("Backend is running!"));
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

  // Store disposal centers info separately - don't add to chat history yet
  let centersString = "";
  
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
        centersString = "\n\nHere are some nearby e‑waste disposal centers:\n";
        centers.forEach((center, idx) => {
          centersString += `${idx + 1}. ${center.name} – ${center.vicinity}\n`;
        });
        console.log("Centers info prepared:", centersString);
      }
    } catch (error) {
      console.error("Error processing disposal branch:", error);
    }
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

  // Determine if we need to refresh the system prompt
  // We'll refresh every 10 messages (counting from 0)
  const messageCount = chatHistoryDoc.messages.length;
  const shouldRefreshSystemPrompt = (messageCount - 1) % 10 === 0;
  console.log(`Message count: ${messageCount}, Refreshing system prompt: ${shouldRefreshSystemPrompt}`);

  // Get recent messages (limited to 20 for API constraints)
  const MAX_MESSAGES = 20;
  const recentMessages = chatHistoryDoc.messages.slice(-MAX_MESSAGES);

  // Prepare conversation history for Gemini
  let conversationForGemini = [];

  // First message is special - it needs to include the system prompt
  if (recentMessages.length > 0) {
    // Always include system prompt with the first user message in our conversation window
    const firstUserMsgIndex = recentMessages.findIndex(msg => msg.role === "user");
    
    if (firstUserMsgIndex !== -1) {
      const firstUserMsg = recentMessages[firstUserMsgIndex];
      
      // For the first message in our window, include the system prompt
      conversationForGemini.push({
        role: "user",
        parts: [
          { text: chatHistoryDoc.systemMessage.content },
          { text: firstUserMsg.content }
        ]
      });
      
      // Add image data if present
      if (firstUserMsg.imageData) {
        conversationForGemini[0].parts.push({
          inlineData: { mimeType: "image/jpeg", data: firstUserMsg.imageData }
        });
      }
      
      // Add the remaining messages
      for (let i = 0; i < recentMessages.length; i++) {
        // Skip the first user message we already added
        if (i === firstUserMsgIndex) continue;
        
        const msg = recentMessages[i];
        const parts = [{ text: msg.content.trim() }];
        
        // Add image if present
        if (msg.imageData) {
          parts.push({
            inlineData: { mimeType: "image/jpeg", data: msg.imageData }
          });
        }
        
        // Use "model" for assistant messages
        const role = msg.role === "assistant" ? "model" : msg.role;
        conversationForGemini.push({ role, parts });
      }
    }
  }

  // If we need to refresh the system prompt and it's not the first message
  if (shouldRefreshSystemPrompt && messageCount > 1) {
    // Insert a "hidden" system prompt message before the latest user message
    const systemPromptRefresh = {
      role: "user",
      parts: [{ text: chatHistoryDoc.systemMessage.content }]
    };
    
    // Find the index of the last user message
    const lastUserMsgIndex = conversationForGemini.length - 1;
    
    // Insert the system refresh right before the latest user message
    // This keeps the conversation flow natural but reminds the AI of its role
    conversationForGemini.splice(lastUserMsgIndex, 0, systemPromptRefresh);
    
    console.log("System prompt refreshed at message count:", messageCount);
  }

  // Filter out any null messages and ensure we're within limits
  conversationForGemini = conversationForGemini
    .filter(msg => msg !== null && msg.parts.some(part => part.text?.trim()))
    .slice(-MAX_MESSAGES);

  console.log("Final conversation for Gemini:", 
    conversationForGemini.map(m => ({ role: m.role, contentLength: m.parts.map(p => p.text || "[image]").join("").length }))
  );

  try {
    const response = await axios.post(`${API_URL}?key=${GEMINI_API_KEY}`, {
      contents: conversationForGemini,
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
      let botReply = response.data.candidates[0].content.parts[0].text;
      console.log("Gemini API reply:", botReply);
    
      // Check if we have centers to add and if the bot is asking for location
      let fullReply;
      if (centersString && botReply.includes("location") && 
         (botReply.includes("provide") || botReply.includes("need") || botReply.includes("share"))) {
        // Replace the "I need your location" part with a direct introduction to centers
        fullReply = "Based on your location, here are some e-waste disposal centers near you:" + centersString;
      } else {
        // Otherwise just append centers to the end if they exist
        fullReply = botReply + centersString;
      }
      
      // Store the COMBINED response in chat history
      chatHistoryDoc.messages.push({
        role: "assistant",
        content: fullReply,
        timestamp: new Date(),
      });
    
      // Save the updated chat history
      await chatHistoryDoc.save();
    
      // Return the COMBINED response to the user
      return fullReply;
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
app.use("/api/forum", forumRoutes);
app.use("/api/event", eventRouter);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);