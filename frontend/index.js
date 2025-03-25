// Generate or retrieve a unique userId from localStorage
let userId = localStorage.getItem("userId");
if (!userId) {
  userId = "guest_" + Math.random().toString(36).substring(2, 11);
  localStorage.setItem("userId", userId);
}
console.log("User ID:", userId);

// Get DOM elements
const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const fileInput = document.getElementById("file-input");

// Function to append a message to the chat window
function appendMessage(role, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", role);
  messageDiv.innerText = text;
  chatWindow.appendChild(messageDiv);
  // Auto-scroll to the bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Listen for form submission
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const message = messageInput.value.trim();
  const file = fileInput.files[0];

  // If no message or file is provided, do nothing.
  if (!message && !file) return;

  // Append the user's message to the chat window
  if (message) {
    appendMessage("user", message);
  }

  // Clear the input fields
  messageInput.value = "";
  fileInput.value = "";

  // Create a FormData object to handle text and file uploads
  const formData = new FormData();
  formData.append("userId", userId);
  if (message) formData.append("message", message);
  if (file) formData.append("image", file);

  try {
    // Send a POST request to the chat endpoint on your backend
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    appendMessage("assistant", data.response);
  } catch (error) {
    console.error("Error sending message:", error);
    appendMessage("assistant", "Sorry, something went wrong.");
  }
});
// index.js

// Function to render a message in the chat window
function appendMessage(role, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", role);
    messageDiv.innerText = text;
    chatWindow.appendChild(messageDiv);
    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  
  // Fetch chat history for the current user and display them
  async function loadChatHistory() {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/history?userId=${userId}`);
      const data = await response.json();
      if (data.history && data.history.length > 0) {
        data.history.forEach(msg => {
          appendMessage(msg.role, msg.content);
        });
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  }
  
  // Call loadChatHistory when the page loads
  window.addEventListener("load", loadChatHistory);
  
