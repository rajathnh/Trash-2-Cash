Okay, understood! This README is tailored for the Trash2Cash project based specifically on the code you provided earlier (Node.js backend and React frontend using Gemini). It focuses on setup and running the existing application.

# Trash2Cash: AI-Powered Waste Management Assistant

Trash2Cash is a web application featuring "EcoBuddy," an AI assistant designed to help users classify waste (especially e-waste) and receive guidance on appropriate disposal methods. It utilizes Google's Gemini AI for understanding text and images, stores conversation history, and can suggest nearby disposal centers based on user location.


## Features (Based on Provided Code)

*   **🤖 AI Chat Assistant (EcoBuddy):**
    *   Processes user text messages and optional image uploads.
    *   Leverages Google Gemini API for waste classification and contextual responses based on a detailed system prompt.
    *   Handles conversation flow for different waste types (Sellable, Recyclable, Disposable, Repairable, Compostable).
*   **📜 Chat History:**
    *   Persists conversation history per user using MongoDB.
    *   Retrieves and displays previous messages upon page load.
*   **📍 Location Awareness (Basic):**
    *   Can receive user's location coordinates.
    *   If a disposal-related query is detected *and* location is provided, uses the Google Places API to find and suggest nearby e-waste disposal centers.
*   **🖼️ Image Upload:**
    *   Allows users to upload images alongside text messages for better context.
*   **🚧 Placeholder Routes:**
    *   Includes placeholder route structures for future Forum (`/api/forum`) and Event (`/api/event`) features (implementations not included in the provided core chat code).

## 🛠️ Tech Stack

*   **Frontend:** React, Styled Components, Axios
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (with Mongoose ODM)
*   **AI:** Google Gemini API 
*   **APIs:** Google Places API (for nearby search)
*   **File Uploads:** Multer
*   **Environment Variables:** dotenv
*   **CORS:** cors package

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16 or later recommended)
*   npm or yarn
*   Git
*   MongoDB instance (local or cloud like MongoDB Atlas)
*   API Keys for:
    *   Google Gemini API
    *   Google Maps/Places API (Ensure Places API is enabled in your Google Cloud Console project)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[YourUsername]/Trash2Cash.git # Replace with your repo URL
    cd Trash2Cash
    ```

2.  **Backend Setup:**
    *   Navigate to the backend directory (assuming it's the root or a `backend/` folder - adjust if needed):
        ```bash
        # cd backend # Uncomment if backend is in a subfolder
        npm install
        ```
    *   Create a `.env` file in the **backend** directory.
    *   Add the following environment variables, replacing the placeholder values with your actual keys and connection string:
        ```dotenv
        PORT=8080 # Or your preferred port
        MONGO_URI="YOUR_MONGODB_CONNECTION_STRING"
        GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
        MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY"
        ```

3.  **Frontend Setup:**
    *   Navigate to the frontend directory (assuming it's a `frontend/` or `client/` folder - adjust if needed):
        ```bash
        cd ../frontend # Adjust path if needed
        npm install
        ```
    *   Create a `.env` file in the **frontend** directory.
    *   Add the following environment variable, ensuring the URL matches your backend server address and port:
        ```dotenv
        REACT_APP_BACKEND_URL=http://localhost:8080
        ```
        *(Note: If your backend and frontend are running on different domains/ports during development or production, ensure CORS is configured correctly in `server.js`)*

### Running the Application

1.  **Start the Backend Server:**
    *   Navigate to the backend directory.
    *   Run the start command:
        ```bash
        cd backend 
        node chatbot
        ```
    *   You should see output indicating the server is running (e.g., `Server running on http://localhost:8080`) and connected to MongoDB.

2.  **Start the Frontend Development Server:**
    *   Navigate to the frontend directory.
    *   Run the start command:
        ```bash
        cd frontend 
        npm start
        ```
    *   This will typically open the application automatically in your default web browser at `http://localhost:3000` (or another port if 3000 is busy).

### Usage

*   Open the application in your browser (usually `http://localhost:3000`).
*   The chat interface will load. If you've used it before on the same browser, it will attempt to load your previous chat history.
*   Type messages into the input field.
*   Optionally, click the paperclip icon to attach an image file before sending.
*   Click the send button (or press Enter) to interact with EcoBuddy.
*   If prompted for location by the browser (via the LocationComponent), allowing it will enable nearby disposal center suggestions for relevant queries.

