// src/pages/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import LocationComponent from "../components/LocationComponent";
import EwasteMap from "../components/EwasteMap";
import Layout from "../components/Layout";
import { FiPaperclip, FiSend, FiTrash2 } from "react-icons/fi";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  // User ID management
  useEffect(() => {
    let savedUserId = localStorage.getItem("userId");
    if (!savedUserId) {
      savedUserId =
        Date.now().toString() + Math.random().toString(36).substring(2);
      localStorage.setItem("userId", savedUserId);
    }
    setUserId(savedUserId);
  }, []);

  // Fetch chat history
  // In the useEffect where you fetch chat history
  useEffect(() => {
    if (userId) {
      axios
        .get(`${BACKEND_URL}/history/${userId}`)
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


  // Scroll handling

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Message sending
  const sendMessage = async () => {
    if ((!input.trim() && !image) || isLoading) return;

    setIsLoading(true);
    const tempMessages = [...messages];

    if (input.trim()) tempMessages.push({ sender: "user", text: input });
    if (image)
      tempMessages.push({
        sender: "user",
        image: URL.createObjectURL(image),
      });

    tempMessages.push({ sender: "bot", text: "..." });
    setMessages(tempMessages);

    try {
      const formData = new FormData();
      formData.append("message", input);
      formData.append("userId", userId);

      const userLocation = localStorage.getItem("userLocation");
      if (userLocation) formData.append("location", userLocation);
      if (image) formData.append("image", image);

      const response = await axios.post(`${BACKEND_URL}/chat`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessages((prev) => [
        ...prev.filter((msg) => msg.text !== "..."),
        {
          sender: "bot",
          text: response.data.reply,
          image: response.data.imageUrl || null,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.filter((msg) => msg.text !== "..."),
        { sender: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setInput("");
      setImage(null);
      setIsLoading(false);
    }
  };

  // Chat clearing - Updated to use JSON header explicitly
  const clearChat = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the chat history?"
    );
    if (confirmClear) {
      try {
        await axios.post(
          `${BACKEND_URL}/clear-history`,
          { userId },
          { headers: { "Content-Type": "application/json" } }
        );
        setMessages([]);
      } catch (error) {
        console.error("Error clearing history:", error);
        alert("Failed to clear chat history. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <ChatContainer>
        {/* <LocationSection>
          <LocationComponent />
          <EwasteMap compact={true} />
        </LocationSection> */}

        <ChatHeader>EcoBuddy Chat</ChatHeader>

        <ChatWrapper>
          <ChatContent>
          <MessageContainer ref={messagesEndRef}>
  {messages.map((msg, index) => (
    <MessageBubble key={index} className={msg.sender}>
      {msg.image && (
        <ImagePreview>
          <img src={msg.image} alt="Uploaded content" />
        </ImagePreview>
      )}
      {msg.text && <MessageText>{msg.text}</MessageText>}
    </MessageBubble>
  ))}
</MessageContainer>


            <InputSection>
              <FileInput>
                <label htmlFor="file-upload">
                  <FiPaperclip />
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    disabled={isLoading}
                  />
                </label>
                {image && (
                  <FileName>
                    {image.name}
                    <button onClick={() => setImage(null)}>×</button>
                  </FileName>
                )}
              </FileInput>

              <TextInput
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                disabled={isLoading}
              />

              <ButtonGroup>
                <SendButton onClick={sendMessage} disabled={isLoading}>
                  {isLoading ? <Spinner /> : <FiSend />}
                </SendButton>
                <ClearButton onClick={clearChat} disabled={isLoading}>
                  <FiTrash2 />
                </ClearButton>
              </ButtonGroup>
            </InputSection>
          </ChatContent>
        </ChatWrapper>
      </ChatContainer>
    </Layout>
  );
}

// Styled components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  padding: 1.5rem;
  background: #f8f9fa;
`;

const ChatHeader = styled.h1`
  font-size: 2rem;
  text-align: center;
  background: linear-gradient(to right, #2563eb, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 auto 1rem; /* Adjusted margin to remove extra space */
`;

const LocationSection = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem; /* Added margin-bottom to control spacing */
  > div {
    height: 280px;
    @media (max-width: 768px) {
      height: 200px;
    }
  }
`;

const ChatWrapper = styled.div`
  max-width: 95%;
  margin: 0 auto;
  background: linear-gradient(
    to right,
rgb(62, 124, 223),
    #8a95bf,
    #2db3e3,
    #3b7c87
  );
  border-radius: 12px;
  padding: 2px; /* Creates a subtle gradient border effect */
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChatContent = styled.div`
  background: white;
  border-radius: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(135deg,rgb(253, 255, 255),rgb(43, 198, 218));
`;

const MessageBubble = styled.div`
  max-width: 75%;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  line-height: 1.4;
  animation: ${keyframes`
    from {
      opacity: 0;
      transform: translateY(10px);
    }
  `} 0.3s ease-in;

  &.user {
    background: #007bff;
    color: white;
    align-self: flex-end;
    border-radius: 1rem 1rem 0 1rem;
  }

  &.bot {
    background: #fff;
    color: #333;
    align-self: flex-start;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-radius: 1rem 1rem 1rem 0;
  }
`;

const MessageText = styled.div`
  margin: 0.5rem 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ImagePreview = styled.div`
  margin: 0.5rem 0;
  img {
    max-width: 250px;
    max-height: 250px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const InputSection = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(90deg, #D6E1F3, #8A95BF, #2DB3E3,rgb(59, 86, 135));
  border-top: 1px solid #eee;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const FileInput = styled.div`
  position: relative;
  label {
    cursor: pointer;
    padding: 0.5rem;
    color: #007bff;
    &:hover {
      opacity: 0.8;
    }
  }
  input[type="file"] {
    display: none;
  }
`;

const FileName = styled.div`
  position: absolute;
  bottom: -28px;
  left: 0;
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  button {
    border: none;
    background: none;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #ff4444;
    }
  }
`;

const TextInput = styled.input`
  flex: 1;
  padding: 0.75rem 1.25rem;
  border: 1px solid #ddd;
  border-radius: 2rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BaseButton = styled.button`
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SendButton = styled(BaseButton)`
  background: #007bff;
  color: white;
  &:hover:not(:disabled) {
    background: #0056b3;
  }
`;

const ClearButton = styled(BaseButton)`
  background: #ff4444;
  color: white;
  &:hover:not(:disabled) {
    background: #cc0000;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: ${keyframes`
    from {
      transform: rotate(0deg);
    }
  `} 1s linear infinite;
`;

export default Chatbot;