# Trash2Cash: AI Assistant & Community Platform for Waste Management

Trash2Cash is a comprehensive web application designed to promote sustainable waste management practices. It features the "EcoBuddy" AI assistant for waste classification and guidance (using Google Gemini), alongside community features like a forum, an educational hub, and event listings potentially sourced via web scraping.


## Features

*   **🤖 AI Waste Assistant (EcoBuddy):**
    *   Classifies waste (Sellable, Recyclable, Repairable, Compostable, Disposable) from user text and image uploads using the **Google Gemini API**.
    *   Provides tailored, actionable advice based on classification and a detailed system prompt.
    *   Maintains conversation history per user (**MongoDB**).
*   **📍 Location-Based Services:**
    *   Retrieves user's geolocation (with permission).
    *   Suggests nearby e-waste disposal centers using the **Google Places API** based on user location for relevant chat queries.
    *   Displays an interactive map via **Google Maps API** on the frontend (though the `EwasteMap` component currently only performs a background search).
*   **💬 Community Forum:**
    *   Allows users (identified by a persistent `userId` and prompted `userName` stored in localStorage) to post messages and images.
    *   Displays posts from all users in a feed, fetched periodically.
*   **📚 Educational Hub:**
    *   Provides structured information on e-waste issues, impacts, handling guidelines, recycling processes, regulations, and links to external resources/videos.
*   **📅 Event Listings:**
    *   Displays sustainable waste management events fetched from the backend API (`/api/event`).
    *   Includes a backend script (`getEvents.js`) using **Puppeteer** to scrape event data from '10times.com' and store it in MongoDB.
*   **🔒 User Authentication (Partial/Inferred):**
    *   Uses **JWT (JSON Web Tokens)** on the backend (implied by `JWT_SECRET`, `JWT_LIFETIME` env vars), suggesting secure routes likely exist for forum/event actions requiring login (though not fully shown in provided frontend code).
    *   Chat and basic Forum interaction use localStorage `userId` and `userName`.
*   **☁️ Cloud Image Storage (Inferred):**
    *   Presence of **Cloudinary** environment variables suggests it's used for storing user-uploaded images (likely for Forum posts, potentially user profiles).

## 🛠️ Tech Stack

*   **Frontend:** React, Styled Components, Axios, React Router DOM
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (with Mongoose ODM)
*   **AI:** Google Gemini API
*   **APIs:** Google Maps API
*   **Cloud Storage:** Cloudinary
*   **Authentication:** JWT (jsonwebtoken library)
*   **File Uploads:** Multer (for backend initial handling)
*   **Web Scraping:** Puppeteer (for `getEvents.js`)
*   **Environment Variables:** dotenv
*   **CORS:** cors package

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16 or later recommended)
*   npm or yarn
*   Git
*   MongoDB instance (local or cloud like MongoDB Atlas)
*   Cloudinary Account
*   Google Cloud Platform Project with:
    *   Gemini API enabled
    *   Maps JavaScript API enabled
    *   Places API enabled

### API Keys & Credentials Needed

You will need the following credentials:

*   MongoDB Connection String (`MONGO_URI`)
*   JWT Secret Key (`JWT_SECRET` - generate a strong random string)
*   Cloudinary Cloud Name, API Key, and API Secret (`CLOUDINARY_...`)
*   Google Gemini API Key (`GEMINI_API_KEY`)
*   Google Maps/Places API Key (`MAPS_API_KEY` for backend, `REACT_APP_MAPS_API_KEY` for frontend)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rajathnh/Trash-2-Cash.git
    cd Trash-2-Cash
    ```

2.  **Backend Setup:**
    *   Navigate to the backend directory (adjust `cd` command if necessary, e.g., `cd backend`):
        ```bash
        cd backend # Or your backend directory name
        npm install
        ```
    *   Create a `.env` file in the **backend** directory.
    *   Copy and paste the following structure, replacing the placeholder values with your actual credentials:
        ```dotenv
        # Server Configuration
        PORT=5000 # Or your preferred backend port
        FRONTEND_URL=http://localhost:3000 # URL of your running frontend

        # Database
        MONGO_URI="YOUR_MONGODB_CONNECTION_STRING"

        # Authentication
        JWT_SECRET="YOUR_STRONG_RANDOM_JWT_SECRET"
        JWT_LIFETIME="1d" # Or your preferred token lifetime

        # Cloudinary Credentials
        CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
        CLOUDINARY_API_KEY="YOUR_CLOUDINARY_API_KEY"
        CLOUDINARY_API_SECRET="YOUR_CLOUDINARY_API_SECRET"

        # Google APIs
        GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
        MAPS_API_KEY="YOUR_GOOGLE_MAPS_PLACES_API_KEY" # Used by backend for Places API
        ```

3.  **Frontend Setup:**
    *   Navigate to the frontend directory (adjust `cd` command if necessary, e.g., `cd ../frontend`):
        ```bash
        cd ../frontend # Or your frontend directory name
        npm install
        ```
    *   Create a `.env` file in the **frontend** directory.
    *   Add the following environment variables, ensuring the URLs/keys match your setup:
        ```dotenv
        REACT_APP_BACKEND_URL=http://localhost:5000 # Must match backend PORT
        REACT_APP_MAPS_API_KEY="YOUR_GOOGLE_MAPS_PLACES_API_KEY" # Same key as backend, used for Maps JavaScript API
        ```
        *(Note: Ensure the backend `PORT` and `FRONTEND_URL` align with `REACT_APP_BACKEND_URL` and where the frontend runs, respectively. The CORS configuration in `server.js` must allow the frontend origin.)*

### Running the Application

1.  **Start the Backend Server:**
    *   Navigate to the backend directory.
    *   Run the start command (ensure `server.js` is your entry point, or use `npm start` if defined in `package.json`):
        ```bash
        cd backend # Or your backend directory
        node server.js
        ```
    *   You should see output indicating the server is running (e.g., `Server running on http://localhost:5000`) and connected to MongoDB (`MongoDB connected`).

2.  **Start the Frontend Development Server:**
    *   Navigate to the frontend directory.
    *   Run the start command:
        ```bash
        cd ../frontend # Or your frontend directory
        npm start
        ```
    *   This will typically open the application automatically in your default web browser at `http://localhost:3000` (or another port if 3000 is busy).


## Usage

*   Open the application in your browser (usually `http://localhost:3000`).
*   Navigate through the different sections using the Navbar:
    *   **Home:** Landing page with various informational sections.
    *   **Chatbot:** Interact with the EcoBuddy AI assistant. Grant location permission if prompted for nearby disposal suggestions.
    *   **Forum:** View community posts and contribute your own messages/images (you'll be prompted for a username if one isn't set).
    *   **Education Hub:** Browse articles and resources about e-waste.
    *   **Events:** View upcoming sustainability events.
