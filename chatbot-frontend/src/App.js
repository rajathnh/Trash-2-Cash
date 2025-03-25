import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Function to generate a random user ID if one doesn't exist.
function generateUserId() {
  return "guest_" + Math.random().toString(36).substring(2, 11);
}

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = generateUserId();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
    loadChatHistory(storedUserId);
  }, []);

  const loadChatHistory = async (uid) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/chat/history?userId=${uid}`
      );
      if (response.data.history && response.data.history.length > 0) {
        const historyMessages = response.data.history.map((msg) => ({
          sender: msg.role,
          text: msg.content,
        }));
        setMessages(historyMessages);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && !file) return;

    // Append user's text if provided
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: "user", text: input }]);
    }

    const formData = new FormData();
    formData.append("userId", userId);
    if (input.trim()) formData.append("message", input);
    if (file) formData.append("image", file);

    setInput("");
    setFile(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: response.data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "Sorry, something went wrong." },
      ]);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">EcoBuddy Chat</div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form className="input-container" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="file-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
