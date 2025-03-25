const { saveMessage } = require("../utils/chatUtils");
const { callGeminiAPI } = require("../utils/geminiAPI");
const fs = require("fs");
const refineResponse = require("../utils/refineResponse"); // Import refineResponse

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

exports.handleTextClassification = async (userId, details) => {
  const prompt = `Classify this e-waste item: "${details}". Should be one of: sellable, repairable, recyclable, or hazardous. Provide a short explanation.`;
  const rawResponse = await callGeminiAPI({ text: prompt });
  const refinedResponse = refineResponse("classify_e_waste", { 
    category: rawResponse.split(" ")[0], 
    explanation: rawResponse 
  });
  await saveMessage(userId, "assistant", refinedResponse);
  return refinedResponse;
};

exports.handleImageClassification = async (userId, imageFile, res) => {
  try {
    const imagePath = `uploads/${imageFile.name}`;
    await imageFile.mv(imagePath); // Save image temporarily

    // Convert image to Base64
    const base64Image = fs.readFileSync(imagePath).toString("base64");

    const prompt = `Classify this e-waste image into one of: sellable, repairable, recyclable, hazardous. Provide a short explanation.`;

    const response = await callGeminiAPI({ text: prompt, image: base64Image });

    fs.unlinkSync(imagePath); // Delete temp image

    return res.json({ response });
  } catch (error) {
    console.error("Image Classification Error:", error);
    return res.status(500).json({ error: "Failed to classify image" });
  }
};
