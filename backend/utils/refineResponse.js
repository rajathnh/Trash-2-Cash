// utils/refineResponse.js
function refineResponse(intent, rawResponse) {
  switch (intent) {
    case "classify_e_waste":
      return `♻️ Your item is classified as **${rawResponse.category}**. ${rawResponse.explanation}`;
    case "recycling_guidance":
      return `🗑️ To recycle your ${rawResponse.item} (condition: ${rawResponse.condition}), you should: ${rawResponse.recyclingMethod}`;
    case "repair_advice":
      return `🛠️ Your ${rawResponse.item} ${rawResponse.repairable ? "can" : "cannot"} be repaired. ${rawResponse.explanation}`;
    case "sell_or_donate":
      return `💰 Your ${rawResponse.item} is ${rawResponse.sellable ? "sellable" : "not sellable"}. ${rawResponse.reason}`;
    case "general_chat":
      return rawResponse; // Simply return the raw message for general chat
    default:
      return "I'm not sure how to respond to that. Could you clarify?";
  }
}

module.exports = refineResponse;
