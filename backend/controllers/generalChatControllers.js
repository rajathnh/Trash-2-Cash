const { saveMessage } = require("../utils/chatUtils");
const { callGeminiAPI } = require("../utils/geminiAPI");

exports.handleChat = async (userId, message) => {
    const response = await callGeminiAPI({ text: message });

  await saveMessage(userId, "assistant", response);
  return response;
};
