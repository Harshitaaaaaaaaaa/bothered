import express from "express";
import { saveMood, getUserMoods } from "../controllers/moodController.js";

const router = express.Router();

// Save mood
router.post("/", saveMood);

// Get moods by user
router.get("/:userId", getUserMoods);

export default router;
