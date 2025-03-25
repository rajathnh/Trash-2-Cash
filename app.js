require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Import Routes
const chatRoutes = require("./backend/routes/chatRoutes");
const detectIntentRoute = require("./backend/routes/detect_intent");
const refineResponseRoute = require("./backend/routes/refineResponse"); // New refine-response endpoint
// in app.js
const chatHistoryRoute = require("./backend/routes/chatHistoryRoutes");



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({ useTempFiles: false }));
app.use(express.static("frontend"));
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/detect-intent", detectIntentRoute);
app.use("/api/refine-response", refineResponseRoute); // Register refine-response route
app.use("/api/chat/history", chatHistoryRoute);

// Default Route
app.get("/", (req, res) => {
  res.send("E-Waste Chatbot API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
