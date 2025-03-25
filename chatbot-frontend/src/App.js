// chatgpt 1st attempt - works for text
// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { sender: "user", text: input }];
//     setMessages(newMessages);
//     setInput("");

//     try {
//       const response = await axios.post("http://localhost:5000/chat", {
//         message: input,
//       });
//       setMessages([
//         ...newMessages,
//         { sender: "bot", text: response.data.reply },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages([
//         ...newMessages,
//         { sender: "bot", text: "Something went wrong!" },
//       ]);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default App;

// deepsek - 1st attempt
// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim() && !selectedImage) return;

//     const newMessage = {
//       sender: "user",
//       text: input.trim(),
//       image: selectedImage,
//     };

//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setSelectedImage(null);

//     try {
//       const response = await axios.post("http://localhost:5000/chat", {
//         message: input.trim(),
//         image: selectedImage,
//       });

//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: response.data.reply },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Something went wrong!" },
//       ]);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.text && <div>{msg.text}</div>}
//             {msg.image && (
//               <img
//                 src={msg.image}
//                 alt="Uploaded content"
//                 style={{ maxWidth: "200px", marginTop: "8px" }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           style={{ display: "none" }}
//           id="file-input"
//         />
//         <label htmlFor="file-input" className="file-label">
//           📎
//         </label>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type your message or upload image..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       {selectedImage && (
//         <div className="preview-image">
//           <img
//             src={selectedImage}
//             alt="Preview"
//             style={{ maxWidth: "100px", marginTop: "8px" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// chatgpt - 2nd attempt
// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [image, setImage] = useState(null);

//   const sendMessage = async () => {
//     if (!input.trim() && !image) return;

//     const newMessages = [...messages, { sender: "user", text: input, image }];
//     setMessages(newMessages);
//     setInput("");
//     setImage(null);

//     const formData = new FormData();
//     formData.append("message", input);
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/chat",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       setMessages([
//         ...newMessages,
//         { sender: "bot", text: response.data.reply },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages([
//         ...newMessages,
//         { sender: "bot", text: "Something went wrong!" },
//       ]);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.text}
//             {msg.image && (
//               <img
//                 src={URL.createObjectURL(msg.image)}
//                 alt="Uploaded"
//                 className="uploaded-image"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type your message..."
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default App;

// chatgpt - 3rd attempt - to save the chat locally
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     const savedMessages = localStorage.getItem("chatMessages");
//     if (savedMessages) {
//       setMessages(JSON.parse(savedMessages));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("chatMessages", JSON.stringify(messages));
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim() && !image) return;

//     const newMessages = [...messages];
//     if (input) newMessages.push({ sender: "user", text: input });
//     if (image) newMessages.push({ sender: "user", text: "[Image uploaded]" });
//     setMessages(newMessages);
//     setInput("");
//     setImage(null);

//     const formData = new FormData();
//     formData.append("message", input);
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/chat",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       setMessages([
//         ...newMessages,
//         { sender: "bot", text: response.data.reply },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages([
//         ...newMessages,
//         { sender: "bot", text: "Something went wrong!" },
//       ]);
//     }
//   };

//   const clearChat = () => {
//     setMessages([]);
//     localStorage.removeItem("chatMessages");
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type your message..."
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           style={{ marginLeft: "10px" }}
//         />
//         <button onClick={sendMessage}>Send</button>
//         <button onClick={clearChat} style={{ marginLeft: "10px" }}>
//           Clear Chat
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;

// chatgpt - 4th attempt  - to show the preview of image
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import LocationComponent from "./components/LocationComponent";
import EwasteMap from "./components/EwasteMap";

function App() {
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
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/history/${userId}`)
        .then((res) => {
          if (res.data.messages) {
            const fetchedMessages = res.data.messages.map((msg) => ({
              sender: msg.role === "assistant" ? "bot" : "user",
              text: msg.content,
              image: msg.imageUrl || null,
            }));
            setMessages(fetchedMessages);
          }
        })
        .catch((error) => {
          console.error("Error fetching history:", error);
        });
    }
  }, [userId]);

  const sendMessage = async () => {
    if (!input.trim() && !image) return;
  
    const newMessages = [...messages];
    if (input.trim()) {
      newMessages.push({ sender: "user", text: input });
    }
    if (image) {
      newMessages.push({
        sender: "user",
        image: URL.createObjectURL(image),
      });
    }
    setMessages(newMessages);
  
    // Retrieve user location from localStorage (if available)
    const userLocation = localStorage.getItem("userLocation");
  
    const formData = new FormData();
    formData.append("message", input);
    formData.append("userId", userId);
    if (userLocation) {
      formData.append("location", userLocation);
    }
    if (image) {
      formData.append("image", image);
    }
  
    setInput("");
    setImage(null);
  
    try {
      const response = await axios.post("http://localhost:5000/chat", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Option 1: Append the final reply as you already do.
      // setMessages([...newMessages, { sender: "bot", text: response.data.reply }]);
      // Option 2: After receiving a reply, fetch the updated history so you show all messages (including any disposal branch messages).
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
    <div className="chat-container">
      {/* Run geolocation and map queries in the background */}
      <LocationComponent />
      <EwasteMap />

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text && <div>{msg.text}</div>}
            {msg.image && (
              <img
                src={msg.image}
                alt="Uploaded preview"
                className="uploaded-image"
              />
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
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={clearChat} style={{ marginLeft: "10px" }}>
          Clear Chat
        </button>
      </div>
    </div>
  );
}

export default App;
