// src/pages/Chatbot.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import LocationComponent from "../components/LocationComponent";
import EwasteMap from "../components/EwasteMap";
import Layout from "../components/Layout";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");

  // Generate or retrieve userId from localStorage
  useEffect(() => {
    let savedUserId = localStorage.getItem("userId");
    if (!savedUserId) {
      savedUserId =
        Date.now().toString() + Math.random().toString(36).substring(2);
      localStorage.setItem("userId", savedUserId);
    }
    setUserId(savedUserId);
  }, []);

  // Fetch chat history from backend when userId is set
// In the useEffect where you fetch chat history
useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/history/${userId}`)
        .then((res) => {
          if (res.data.messages) {
            const fetchedMessages = res.data.messages
              .map((msg) => ({
                sender: msg.role === "assistant" ? "bot" : "user",
                text: msg.content,
                image: msg.imageUrl || null,
              }));
            setMessages(fetchedMessages);
          }
        })
        .catch((error) => console.error("Error fetching history:", error));
    }
  }, [userId]);

  const sendMessage = async () => {
    if (!input.trim() && !image) return;

    const newMessages = [...messages];
    if (input.trim()) {
      newMessages.push({ sender: "user", text: input });
    }
    if (image) {
      newMessages.push({ sender: "user", image: URL.createObjectURL(image) });
    }
    setMessages(newMessages);

    // Retrieve user location from localStorage (if available)
    const userLocation = localStorage.getItem("userLocation");

    const formData = new FormData();
    formData.append("message", input);
    formData.append("userId", userId);
    if (userLocation) formData.append("location", userLocation);
    if (image) formData.append("image", image);

    setInput("");
    setImage(null);

    try {
      const response = await axios.post("http://localhost:5000/chat", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const historyRes = await axios.get(`http://localhost:5000/history/${userId}`);
      if (historyRes.data.messages) {
        const updatedMessages = historyRes.data.messages.map((msg) => ({
          sender: msg.role === "assistant" ? "bot" : "user",
          text: msg.content,
          image: msg.imageUrl || null,
        }));
        setMessages(updatedMessages);
      } else {
        setMessages([...newMessages, { sender: "bot", text: response.data.reply }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { sender: "bot", text: "Something went wrong!" }]);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <Layout>
      <ChatContainer>
        <LocationComponent />
        <EwasteMap />
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text && <div>{msg.text}</div>}
              {msg.image && (
                <img src={msg.image} alt="Uploaded preview" className="uploaded-image" />
              )}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={sendMessage}>Send</button>
          <button onClick={clearChat} style={{ marginLeft: "10px" }}>Clear Chat</button>
        </div>
      </ChatContainer>
    </Layout>
  );
}

const ChatContainer = styled.div`
  padding: 20px;
  text-align: center;

  .chat-box {
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
  }

  .input-container {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .uploaded-image {
    max-width: 100px;
    max-height: 100px;
  }

  .message {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
  }

  .user {
    background-color: #d1e7ff;
    text-align: right;
  }

  .bot {
    background-color: #f1f1f1;
    text-align: left;
  }
`;

export default Chatbot;