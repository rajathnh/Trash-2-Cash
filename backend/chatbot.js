// require("dotenv").config();
// const axios = require("axios");
// const readlineSync = require("readline-sync");

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const API_URL =
//   "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent";

// async function getGeminiResponse(message) {
//   try {
//     const response = await axios.post(`${API_URL}?key=${GEMINI_API_KEY}`, {
//       contents: [{ parts: [{ text: message }] }],
//     });

//     const reply = response.data.candidates[0].content.parts[0].text;
//     return reply;
//   } catch (error) {
//     console.error(
//       "Error:",
//       error.response ? error.response.data : error.message
//     );
//     return "Sorry, something went wrong.";
//   }
// }

// async function chat() {
//   console.log("Gemini Chatbot - Type 'exit' to quit.");
//   while (true) {
//     const userMessage = readlineSync.question("You: ");
//     if (userMessage.toLowerCase() === "exit") break;
//     const botResponse = await getGeminiResponse(userMessage);
//     console.log("Bot:", botResponse);
//   }
// }

// chat();

//

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent";

// Set identity and instructions
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

let conversationHistory = [{ role: "user", parts: [{ text: systemMessage }] }];

async function getGeminiResponse(message) {
  conversationHistory.push({ role: "user", parts: [{ text: message }] });

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

// Create a POST endpoint to handle frontend requests
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const botResponse = await getGeminiResponse(message);
  res.json({ reply: botResponse });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
