import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forum.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log(BACKEND_URL)

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);

  // Retrieve userId from localStorage
  const userId =
    localStorage.getItem("userId") ||
    "guest_" + Math.random().toString(36).substring(2, 11);

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

  // Fetch forum messages from backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/forum`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching forum messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [userId]);

  // Handle form submission for new forum messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !image) return;
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("userName", userName);
      formData.append("message", newMessage);
      if (image) {
        formData.append("image", image);
      }
      await axios.post(`${BACKEND_URL}/api/forum`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewMessage("");
      setImage(null);
      fetchMessages(); // Refresh messages after posting
    } catch (error) {
      console.error("Error posting forum message:", error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <Navbar hideForum={true} hideGetStarted={true} disableSlide={true} showChatButton={true}/>
      <div className="forum-container">
        <h2>Community Discussion Forum</h2>
        <p className="forum-subtitle">
          Engage with others, share insights, and discuss e-waste management solutions.
        </p>
        <div className="forum-messages">
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet. Be the first to post!</p>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className="forum-message">
                <div className="message-header">
                  <strong>{msg.userName}</strong>
                  <span className="forum-timestamp">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="message-content">{msg.message}</p>
                {msg.imageUrl && (
                  <div className="forum-image">
                    <img src={msg.imageUrl} alt="Forum upload" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit} className="forum-form">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            required={!image} 
          ></textarea>
          <div className="file-group">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {image && <span className="file-name">{image.name}</span>}
          </div>
          <button type="submit">Post Message</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Forum;