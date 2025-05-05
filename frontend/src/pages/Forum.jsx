import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Forum.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiImage, FiSend, FiVideo, FiCheckCircle, FiChevronDown } from "react-icons/fi";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Forum = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalMessages, setTotalMessages] = useState(0);
  
  const messagesContainerRef = useRef(null);
  const prevScrollInfo = useRef({ height: 0, top: 0 });
  const fileInputRef = useRef(null);
  const successTimeout = useRef(null);

  const userId = localStorage.getItem("userId") || "guest_" + Math.random().toString(36).substring(2, 11);
  const userName = localStorage.getItem("userName") || "Anonymous";

  const maintainScrollPosition = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight - prevScrollInfo.current.height + prevScrollInfo.current.top;
  };

  const saveScrollPosition = () => {
    const container = messagesContainerRef.current;
    if (container) {
      prevScrollInfo.current = {
        height: container.scrollHeight,
        top: container.scrollTop
      };
    }
  };

  const fetchMessages = async (newPage = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/forum`, {
        params: { page: newPage, limit: 20 }
      });
      
      setMessages(prev => 
        newPage === 1 ? 
        response.data.messages : 
        [...prev, ...response.data.messages]
      );
      setHasMore(response.data.hasMore);
      setTotalMessages(response.data.total);
      
    } catch (error) {
      setError("Failed to load messages. Please try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    saveScrollPosition();
    try {
      const newPage = page + 1;
      setPage(newPage);
      const response = await axios.get(`${BACKEND_URL}/api/forum`, {
        params: { page: newPage, limit: 20 }
      });

      setMessages(prev => [...prev, ...response.data.messages]);
      setHasMore(response.data.hasMore);
      
      requestAnimationFrame(maintainScrollPosition);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
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

      const response = await axios.post(`${BACKEND_URL}/api/forum`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Add new message to top and scroll to it
      setMessages(prev => [response.data.data, ...prev]);
      
      // Smooth scroll to top after state update
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }, 100);

      setSuccessMessage("Message posted!");
      setNewMessage("");
      setMedia(null);
      
      clearTimeout(successTimeout.current);
      successTimeout.current = setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to post message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const checkScrollPosition = (e) => {
    const { scrollTop } = e.target;
  };

  return (
    <>
      <Navbar />
      
      {successMessage && (
        <div className="upload-success">
          <FiCheckCircle className="mr-2" />
          {successMessage}
        </div>
      )}

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

        <div 
          className="forum-messages" 
          ref={messagesContainerRef}
          onScroll={checkScrollPosition}
        >
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
                  <div className="user-avatar">
                    {msg.userName.charAt(0).toUpperCase()}
                  </div>
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
                          <video controls>
                            <source src={msg.mediaUrl} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={msg.mediaUrl} alt="Content" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {hasMore && (
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
                        Load More 
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="message-form">
          <div className="form-group">
            <div className="input-container">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
                placeholder="Write your message... (Shift+Enter for new line)"
                rows="3"
              />
              <div className="action-buttons">
                <button
                  type="button"
                  className="media-btn"
                  onClick={() => fileInputRef.current.click()}
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
                <button 
                  type="submit" 
                  className="send-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="submitting-spinner small"></div>
                  ) : (
                    <><FiSend /> Post</>
                  )}
                </button>
              </div>
            </div>
            {media && (
              <div className="media-preview">
                {media.type.startsWith('video') ? (
                  <video controls>
                    <source src={URL.createObjectURL(media)} />
                  </video>
                ) : (
                  <img src={URL.createObjectURL(media)} alt="Preview" />
                )}
                <button
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