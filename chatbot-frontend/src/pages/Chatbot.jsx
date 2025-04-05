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
  console.log(BACKEND_URL)
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
      <NavbarSpacer />
      <ChatContainer>
      <LocationSection>
          <LocationComponent />
          <EwasteMap compact={true} />
        </LocationSection>
        <ChatHeader>
          <h1>EcoBuddy Chat</h1>
          <p>Your Sustainable Companion</p>
        </ChatHeader>

        <ChatWrapper>
          <ChatContent>
            <MessageContainer ref={messagesEndRef}>
              {messages.map((msg, index) => (
                <MessageBubble key={index} className={msg.sender}>
                  {msg.image && (
                    <ImagePreview>
                      <img src={msg.image} alt="User content" />
                    </ImagePreview>
                  )}
                  {msg.text && <MessageText>{msg.text}</MessageText>}
                  {msg.sender === "bot" && (
                    <BotIndicator>
                      <span>🌱 EcoBuddy</span>
                    </BotIndicator>
                  )}
                </MessageBubble>
              ))}
            </MessageContainer>

            <InputSection>
              <InputGroup>
                <FileInput>
                  <label htmlFor="file-upload" title="Attach image">
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
                      <button
                        onClick={() => setImage(null)}
                        aria-label="Remove file"
                      >
                        ×
                      </button>
                    </FileName>
                  )}
                </FileInput>

                <TextInput
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your eco-question..."
                  disabled={isLoading}
                  aria-label="Type your message"
                />

                <ButtonGroup>
                  <SendButton
                    onClick={sendMessage}
                    disabled={isLoading}
                    aria-label="Send message"
                  >
                    {isLoading ? <Spinner /> : <FiSend />}
                  </SendButton>
                  <ClearButton
                    onClick={clearChat}
                    disabled={isLoading}
                    aria-label="Clear chat"
                  >
                    <FiTrash2 />
                  </ClearButton>
                </ButtonGroup>
              </InputGroup>
            </InputSection>
          </ChatContent>
        </ChatWrapper>
      </ChatContainer>
      <FooterSpacer />
    </Layout>
  );
}

// Styled components with enhanced responsiveness

const ChatContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: calc(100vh - 80px);
  background: white;
  padding: 1.5rem;
  gap: 1rem;

  @media (max-width: 1024px) {
    padding: 1rem;
    height: calc(100vh - 70px);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    height: calc(100vh - 60px);
    padding-top: 60px;
    padding-bottom: 30px;
  }
`;

const ChatHeader = styled.header`
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: -40px auto 1.5rem;
  width: 100%;
  max-width: 1280px;

  h1 {
    font-size: 2rem;
    margin: 0;
    background: linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #845ec2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;
const LocationSection = styled.div`
  background: white;
  padding: 0rem;
  margin-bottom: 0rem;
  > div {
    height: 0px;
    @media (max-width: 768px) {
      height: 0px;
    }
  }
`;

const ChatWrapper = styled.div`
  flex: 1;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  border: 2px solid rgb(144, 107, 255); /* Contrast border */

  @media (max-width: 1024px) {
    margin: 0 1rem;
  }

  @media (max-width: 768px) {
    width: 95%;
    max-width: 100%;
  }
`;

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: linear-gradient(135deg, rgb(253, 255, 255), rgb(79, 164, 175));

  @media (max-width: 1024px) {
    padding: 1rem;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 1.25rem;
  border-radius: 1.5rem;
  line-height: 1.5;
  animation: ${keyframes`
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  `} 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  position: relative;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &.user {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    align-self: flex-end;
    border-radius: 1.5rem 1.5rem 0.5rem 1.5rem;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.2);
  }

  &.bot {
    background: linear-gradient(135deg, #c3f7cf 0%, #9fd8e5 100%);
    color: #1f2937;
    align-self: flex-start;
    border-radius: 1.5rem 1.5rem 1.5rem 0.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 1rem;
  }
`;

const MessageText = styled.div`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ImagePreview = styled.div`
  margin: 0.5rem 0;
  img {
    max-width: 100%;
    max-width: min(100%, 300px);
    max-height: 250px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }
`;

const BotIndicator = styled.div`
  position: absolute;
  bottom: -18px;
  left: 0;
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  span {
    background: rgba(255, 255, 255, 0.9);
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const InputSection = styled.div`
  padding: 1.5rem;
  background: linear-gradient(90deg, #d6e1f3, #8a95bf, #2db3e3, rgb(80, 105, 151));
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.03);

  @media (max-width: 1024px) {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 1024px) {
    gap: 0.75rem;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const TextInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 2rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 1024px) {
    padding: 0.75rem 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const FileInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  label {
    cursor: pointer;
    padding: 0.75rem;
    background: #f3f4f6;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: grid;
    place-items: center;
    
    &:hover {
      background: #e5e7eb;
      transform: rotate(45deg);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: #4b5563;
    }
  }

  input[type="file"] {
    display: none;
  }
`;

const FileName = styled.div`
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 0;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  white-space: nowrap;

  button {
    border: none;
    background: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0.25rem;
    line-height: 1;
    
    &:hover {
      color: #ef4444;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const BaseButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const SendButton = styled(BaseButton)`
  background: linear-gradient(45deg, #ff6b6b 0%, #ff8e53 100%);
  color: white;

  &:hover:not(:disabled) {
    background: linear-gradient(45deg, #ff5757 0%, #ff7b3d 100%);
    transform: translateY(-1px);
  }
`;

const ClearButton = styled(BaseButton)`
  background: linear-gradient(45deg, #4facfe 0%, #845ec2 100%);
  color: white;

  &:hover:not(:disabled) {
    background: linear-gradient(45deg, #3d9cfd 0%, #7649b8 100%);
    color: white;
  }
`;

const Spinner = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `} 0.8s linear infinite;
`;

export const NavbarSpacer = styled.div`
  height: 90px;
  background: white;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

export const FooterSpacer = styled.div`
  height: 40px;
  background: white;

  @media (max-width: 768px) {
    height: 30px;
  }
`;

export default Chatbot;
