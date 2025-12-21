import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/alert", alertRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/contacts", contactRoutes);

// test route
app.get("/", (req, res) => {
  res.send("bothered? backend running 🚀");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
