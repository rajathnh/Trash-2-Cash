import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Forum.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiImage, FiSend, FiVideo, FiCheckCircle,FiChevronDown } from "react-icons/fi";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Forum = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isNearBottom, setIsNearBottom] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const successTimeout = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalMessages, setTotalMessages] = useState(0);
  const messagesContainerRef = useRef(null);
  const prevScrollInfo = useRef({ height: 0, top: 0 });
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const userId = localStorage.getItem("userId") || "guest_" + Math.random().toString(36).substring(2, 11);
  const userName = localStorage.getItem("userName") || "Anonymous";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async (newPage = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/forum`, {
        params: { page: newPage, limit: 20 }
      });
      
      setMessages(prev => newPage === 1 ? 
        response.data.messages : 
        [...prev, ...response.data.messages]
      );
      setHasMore(response.data.hasMore);
      setTotalMessages(response.data.total);
      setError("");
    } catch (error) {
      setError("Failed to load messages. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    // Save current scroll position
    const messagesContainer = document.querySelector('.forum-messages');
    const prevScrollHeight = messagesContainer.scrollHeight;
    const prevScrollTop = messagesContainer.scrollTop;
  
    try {
      const newPage = page + 1;
      setPage(newPage);
      
      const response = await axios.get(`${BACKEND_URL}/api/forum`, {
        params: { page: newPage, limit: 20 }
      });
  
      setMessages(prev => [...response.data.messages, ...prev]);
      setHasMore(response.data.hasMore);
  
      // Restore scroll position after update
      requestAnimationFrame(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight - prevScrollHeight + prevScrollTop;
      });
    } catch (error) {
      console.error('Error loading more messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(() => fetchMessages(1), 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isNearBottom && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);
  
  const checkScrollPosition = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsNearBottom(scrollHeight - scrollTop - clientHeight < 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !media) return;
    
    try {
      setIsSubmitting(true); 
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("userName", userName);
      formData.append("message", newMessage);
      if (media) formData.append("media", media);

      await axios.post(`${BACKEND_URL}/api/forum`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("Message posted successfully!");
      clearTimeout(successTimeout.current);
      successTimeout.current = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setNewMessage("");
      setMedia(null);
      await fetchMessages();
    } catch (error) {
      console.error("Error posting message:", error);
      setError("Failed to post message. Please try again.");
    }
    finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMediaClick = () => {
    fileInputRef.current.click();
  };

  const generateAvatar = (name, isOwn) => {
    const colors = ['#FFB399', '#FF99C8', '#FCF6BD', '#D0F4DE', '#A9DEF9'];
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const color = colors[hash % colors.length];
    
    return (
      <div className={`user-avatar ${isOwn ? 'own-avatar' : ''}`} style={{ backgroundColor: color }}>
        {name.charAt(0).toUpperCase()}
      </div>
    );
  };

  

  return (
    <>
      <Navbar />
      {/* Success Notification at Top */}
      {successMessage && (
        <div className="upload-success">
          <FiCheckCircle className="mr-2" />
          {successMessage}
        </div>
      )}

      {/* Submitting Overlay */}
      {isSubmitting && (
        <div className="submitting-overlay">
          <div className="submitting-spinner"></div>
        </div>
      )}

      <div className="forum-container">
        <div className="forum-header">
          <h1>Community Forum</h1>
          <p className="forum-subtitle">
            Connect, share, and learn about e-waste management
          </p>
        </div>

        {error && <div className="forum-error">{error}</div>}

        <div className="forum-messages" onScroll={checkScrollPosition}>
  {loading && messages.length === 0 ? (
    <div className="loading-spinner"></div>
  ) : messages.length === 0 ? (
    <div className="empty-state">
      <img src="/forum-empty.svg" alt="Empty forum" />
      <p>No discussions yet. Start the conversation!</p>
    </div>
  ) : (
    <>
      {messages.map((msg) => (
        <div key={msg._id} className={`message ${msg.userId === userId ? "own-message" : ""}`}>
          {generateAvatar(msg.userName, msg.userId === userId)}
          <div className="message-content">
            <div className="message-header">
              <span className="username">{msg.userName}</span>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })} • {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            {msg.message && <p className="text">{msg.message}</p>}
            {msg.mediaUrl && (
              <div className="message-media">
                {msg.mediaType === 'video' ? (
                  <video controls className="media-player">
                    <source src={msg.mediaUrl} type="video/mp4" />
                    Your browser does not support videos
                  </video>
                ) : (
                  <img 
                    src={msg.mediaUrl} 
                    alt="Uploaded content" 
                    className="media-image"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      ))}

{messages.length > 0 && hasMore && (
  <div className="load-more-container">
    <button 
      onClick={handleLoadMore}
      className="load-more-btn"
      disabled={loading}
    >
      {loading ? (
        <div className="submitting-spinner small"></div>
      ) : (
        <>
          <FiChevronDown />
          Load More ({totalMessages - messages.length} remaining)
        </>
      )}
    </button>
  </div>
)}
    </>
  )}
  <div ref={messagesEndRef} />
</div>

        <form onSubmit={handleSubmit} className="message-form">
          <div className="form-group">
            <div className="input-container">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Write your message... (Shift+Enter for new line)"
                rows="3"
              />

              <div className="action-buttons">
                <button
                  type="button"
                  className="media-btn"
                  onClick={handleMediaClick}
                >
                  <FiImage /><FiVideo /> Media
                </button>
                
                <input
                  type="file"
                  accept="image/*, video/*"
                  onChange={(e) => setMedia(e.target.files[0])}
                  ref={fileInputRef}
                  hidden
                />
                
                <button type="submit" className="send-btn" disabled={isSubmitting}>
                {isSubmitting ? (
              <div className="submitting-spinner small"></div>
            ) : ( <><FiSend /> Post</> )}
                </button>
              </div>
            </div>

            {media && (
              <div className="media-preview">
                {media.type.startsWith('video') ? (
                  <video controls>
                    <source src={URL.createObjectURL(media)} type={media.type} />
                  </video>
                ) : (
                  <img src={URL.createObjectURL(media)} alt="Preview" />
                )}
                <button
                  type="button"
                  className="remove-media"
                  onClick={() => setMedia(null)}
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Forum;