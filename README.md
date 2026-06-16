# 🧠 Bothered?

A comprehensive, full-stack mental health and mood tracking application designed to help users understand their emotions, find peace, and get support when they need it most.

## ✨ Features

* **User Authentication**: Secure signup and login functionality to keep user data private.
* **Mood Tracking & Calendar**: Log daily moods and visualize emotional trends over time on an interactive calendar.
* **AI Companion (Gemini)**: An intelligent, empathetic AI chatbot powered by Google's Generative AI to talk through feelings and thoughts.
* **Meditation & Affirmations**: Dedicated spaces for mindfulness, guided meditation, and daily positive affirmations.
* **Helpline & Emergency Contacts**: Quick access to SOS helplines and an integrated system to alert trusted contacts via email in times of distress.
* **Location Services**: Interactive maps (powered by Leaflet) to find nearby help or resources.

## 🛠️ Tech Stack

### Frontend
* **Framework**: React 19 + Vite
* **Styling**: Tailwind CSS (v4)
* **Maps**: Leaflet (`react-leaflet`)
* **Icons & Components**: `react-icons`, `react-calendar`
* **HTTP Client**: Axios

### Backend
* **Environment**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (via Mongoose)
* **Authentication**: `bcryptjs` for password hashing, JWT (expected)
* **AI Integration**: `@google/generative-ai` (Gemini API)
* **Email Services**: `nodemailer`

## 📂 Project Structure

```
bothered/
├── backend/            # Express backend & API logic
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers (AI, Auth, Mood, etc.)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express API routes
│   └── server.js       # Main entry point
│
└── frontend/           # React frontend application
    ├── src/
    │   ├── components/ # React components (Chat, Calendar, Home, etc.)
    │   ├── App.jsx     # Main React component
    │   └── main.jsx    # Vite entry point
    └── index.html
```

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)
* A [Google Gemini API Key](https://aistudio.google.com/) for the AI Chatbot

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd bothered
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
# Email Config (for nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
# JWT Secret (if applicable)
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

You will need two separate terminal windows/tabs to run the frontend and backend simultaneously.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
*The server will start on `http://localhost:5000`*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
*The React app will start on `http://localhost:5173`*

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is licensed under the ISC License.
