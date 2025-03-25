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

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: "uploads/" });
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent";

const systemMessage = `
You are EcoBuddy, a smart waste management assistant designed to help users identify waste categories and guide them through the appropriate next steps. Your main goal is to classify the e-waste and then guide the user as to what to do with that. You have to process the images that the user uploads and classify the waste into five categories: Sellable, Recyclable, Disposable, Repairable, and Compostable.

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
If they agree, redirect them to the \"Trash to Cash\" organization’s website where they can request a pickup. This is the link of that website -- https://www.trashtocash.co.in

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

let conversationHistory = [{ role: "user", parts: [{ text: systemMessage }] }];

async function getGeminiResponse(message, imageBase64) {
  const contents = [{ role: "user", parts: [{ text: message }] }];
  if (imageBase64) {
    contents[0].parts.push({
      inlineData: { mimeType: "image/jpeg", data: imageBase64 },
    });
  }
  conversationHistory.push(...contents);

  try {
    const response = await axios.post(`${API_URL}?key=${GEMINI_API_KEY}`, {
      contents: conversationHistory,
    });

    const botReply = response.data.candidates[0].content.parts[0].text;
    conversationHistory.push({ role: "model", parts: [{ text: botReply }] });
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
  const { message } = req.body;
  let imageBase64 = null;

  if (req.file) {
    const imagePath = path.join(__dirname, req.file.path);
    const imageBuffer = fs.readFileSync(imagePath);
    imageBase64 = imageBuffer.toString("base64");
    fs.unlinkSync(imagePath); // Clean up
  }

  const botResponse = await getGeminiResponse(message, imageBase64);
  res.json({ reply: botResponse });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
