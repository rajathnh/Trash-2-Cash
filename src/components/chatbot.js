import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";
import "../chatbot.css"; // You may keep additional global styles if needed

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
    <>
      <Navbar hideGetStarted={true} />
      <ChatWrapper>
        <ChatContainer>
          <ChatHeader>EcoBuddy Chat</ChatHeader>
          <ChatBox>
            {messages.map((msg, index) => (
              <ChatMessage key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </ChatMessage>
            ))}
          </ChatBox>
          <ChatForm onSubmit={sendMessage}>
            <ChatInput
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <ChatFileInput
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            <ChatSendButton type="submit">Send</ChatSendButton>
          </ChatForm>
        </ChatContainer>
      </ChatWrapper>
      <Footer />
    </>
  );
}

export default App;

/* ========== Styled Components ========== */
const ChatWrapper = styled.div`
  margin-top: 120px;
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
  padding: 0 20px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 100%;
  max-width: 800px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 20px;

  @media (max-width: 768px) {
    height: 600px; /* Increase height on smaller screens if needed */
    padding: 15px;
  }
`;

const ChatHeader = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
  background: linear-gradient(to right, #2563eb, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ChatBox = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 20px;
  background: #f4f7fb;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const ChatMessage = styled.div`
  font-family: 'Petrona', serif;
  font-size: 1rem;
  padding: 8px 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: ${({ className }) =>
    className.includes("assistant") ? "#e0f7fa" : "#dcedc8"};
  align-self: ${({ className }) =>
    className.includes("assistant") ? "flex-start" : "flex-end"};

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 6px 10px;
  }
`;

const ChatForm = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const ChatInput = styled.input`
  flex: 1.5;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const ChatFileInput = styled.input`
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ChatSendButton = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  background: linear-gradient(to right, #2563eb, #9333ea);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(to right, #1e40af, #7e22ce);
    transform: scale(1.02);
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
`;
