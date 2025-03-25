// recycleControllers.js
const { saveMessage } = require("../utils/chatUtils");
const { callGeminiAPI } = require("../utils/geminiAPI");
const refineResponse = require("../utils/refineResponse");

exports.handleRecyclingQuery = async (userId, details) => {
    const prompt =  `
    You are EcoBuddy, a knowledgeable waste management assistant. Provide guidance on how to safely recycle or dispose of the following item. Consider local regulations and best practices.
    Item details: "${details}"
    Return safe disposal methods and any relevant instructions.
    `;
    
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
    const prompt =  `
    You are EcoBuddy, an experienced e-waste management assistant. Evaluate the following item to determine if it can be sold or donated.
    Item details: "${details}"
    If the item is suitable, suggest platforms for selling or donation centers for donating the item.
    `;
    
  // Wrap the prompt inside an object with the key "text"
  const response = await callGeminiAPI({ text: prompt });
  await saveMessage(userId, "assistant", response);
  return response;
};
