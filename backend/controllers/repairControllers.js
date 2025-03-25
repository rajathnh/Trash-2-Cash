const { saveMessage } = require("../utils/chatUtils");
const { callGeminiAPI } = require("../utils/geminiAPI");

exports.handleRepairQuery = async (userId, details) => {
  const prompt = `Can "${details}" be repaired? If yes, suggest common fixes and tools needed.`;
  // Call callGeminiAPI with an object containing text
  const response = await callGeminiAPI({ text: prompt });
  await saveMessage(userId, "assistant", response);
  return response;
};
