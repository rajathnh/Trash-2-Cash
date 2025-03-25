const axios = require("axios");

async function callGeminiAPI({ text, image = null }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;


  // Ensure either text or image is provided
  if (!text && !image) {
    console.error("❌ Error: No valid input (text or image) provided to Gemini API.");
    return "Sorry, I couldn't process that request.";
  }

  // Prepare request payload
  const contents = [{ role: "user", parts: [] }];
  if (text) {
    contents[0].parts.push({ text });
  }
  if (image) {
    contents[0].parts.push({ inlineData: { data: image, mimeType: "image/png" } });
  }

  try {
    const response = await axios.post(apiUrl, { contents }, {
      headers: { "Content-Type": "application/json" }
    });

    // Debug: Log the raw response from Gemini API
    console.log("Raw Gemini API Response:", JSON.stringify(response.data, null, 2));

    // Extract classification result
    const classification = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Classification Result:", classification);

    return classification || "I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return "Sorry, I couldn't process that request.";
  }
}

module.exports = { callGeminiAPI };
