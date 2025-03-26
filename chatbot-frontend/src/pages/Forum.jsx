import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forum.css";

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Retrieve userId from localStorage (assume it's already set)
  const userId = localStorage.getItem("userId") || "guest_" + Math.random().toString(36).substring(2, 11);

  // Retrieve or prompt for userName
  let storedUserName = localStorage.getItem("userName");
  if (!storedUserName) {
    storedUserName = prompt("Please enter your name:");
    if (storedUserName) {
      localStorage.setItem("userName", storedUserName);
    } else {
      storedUserName = "Anonymous";
      localStorage.setItem("userName", storedUserName);
    }
  }
  const userName = storedUserName;
  console.log("User ID:", userId, "User Name:", userName);

  // Fetch all forum messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/forum");
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching forum messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle form submission for new forum messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/forum", {
        userId,
        userName,
        message: newMessage,
      });
      setNewMessage("");
      fetchMessages(); // Refresh messages after posting
    } catch (error) {
      console.error("Error posting forum message:", error);
    }
  };

  return (
    <div className="forum-container">
      <h2>Community Discussion Forum</h2>
      <div className="forum-messages">
        {messages.length === 0 ? (
          <p>No messages yet. Be the first to post!</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="forum-message">
              <p className="forum-message-header">
                <strong>{msg.userName}</strong>{" "}
                <span className="forum-timestamp">
                  ({new Date(msg.timestamp).toLocaleString()})
                </span>
              </p>
              <p className="forum-message-content">{msg.message}</p>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="forum-form">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          required
        ></textarea>
        <button type="submit">Post Message</button>
      </form>
    </div>
  );
};

export default Forum;
