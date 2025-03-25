const { saveMessage } = require("../utils/chatUtils");
const { callGeminiAPI } = require("../utils/geminiAPI");

exports.handleRepairQuery = async (userId, details) => {
    const prompt =  `
    You are EcoBuddy, a smart e-waste assistant. Assess whether the following item can be repaired.
    Item details: "${details}"
    If repairable, provide common repair fixes, the tools needed, and any advice on finding local repair services.
    `;
    
  // Call callGeminiAPI with an object containing text
  const response = await callGeminiAPI({ text: prompt });
  await saveMessage(userId, "assistant", response);
  return response;
};
