const axios = require("axios");

async function detectIntent(message) {
  if (!message) return { intent: "unknown", details: {} };

  // Prompt for intent classification
  const intentPrompt = `
  Analyze the user's message and determine the intent. Return the intent and relevant details in JSON format.
  The possible intents are:
  - classify_e_waste: If the user wants to classify an item. Extract item name.
  - recycling_guidance: If the user asks how to recycle or dispose of an item. Extract item name.
  - repair_advice: If the user wants to know if an item is repairable. Extract item name.
  - sell_or_donate: If the user wants to sell or donate an item. Extract item name.
  - general_chat: If the message is unrelated to e-waste, but still meant for a chatbot.
  - unknown: If the intent is unclear or doesn't match any listed categories.
  
  Extract as many details as possible. 
  Ensure the output is a JSON object with "intent" as a key.
  Message: "${message}"
  `;

  try {
    console.log("detectIntent: Sending prompt to Gemini API...");
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent",
      {
        contents: [{ role: "user", parts: [{ text: intentPrompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    // Log raw response data
    console.log("detectIntent: Raw Gemini API Response:", JSON.stringify(response.data, null, 2));

    // Extract and clean the response
    let generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (generatedText) {
      generatedText = generatedText.replace(/```json/g, "").replace(/```/g, "").trim();
      console.log("detectIntent: Cleaned Generated Text:", generatedText);
    } else {
      console.warn("detectIntent: No generated text received");
    }

    // Parse the JSON output from Gemini
    const intentData = JSON.parse(generatedText);
    console.log("detectIntent: Parsed Intent Data:", intentData);
    return intentData;
  } catch (error) {
    console.error("Intent Detection Error:", error.response?.data || error.message);
    return { intent: "unknown", details: {} };
  }
}

module.exports = detectIntent;
