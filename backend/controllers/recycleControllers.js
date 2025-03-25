// recycleControllers.js
const { saveMessage } = require("../utils/chatUtils");
const { callGeminiAPI } = require("../utils/geminiAPI");
const refineResponse = require("../utils/refineResponse");

exports.handleRecyclingQuery = async (userId, details) => {
  const prompt = `How should I recycle or dispose of "${details}"? Provide safe disposal methods.`;
  const rawText = await callGeminiAPI({ text: prompt });
  console.log("Recycling Query Raw Response:", rawText);
  
  const rawResponse = {
    item: details,
    condition: "old", // Or extract from detectIntent if available
    recyclingMethod: rawText
  };

  const refined = refineResponse("recycling_guidance", rawResponse);
  console.log("Recycling Query Refined Response:", refined);
  
  await saveMessage(userId, "assistant", refined);
  return refined;
};



  


exports.handleSellOrDonateQuery = async (userId, details) => {
  const prompt = `Can I sell or donate "${details}"? If yes, suggest platforms or donation centers.`;
  // Wrap the prompt inside an object with the key "text"
  const response = await callGeminiAPI({ text: prompt });
  await saveMessage(userId, "assistant", response);
  return response;
};
