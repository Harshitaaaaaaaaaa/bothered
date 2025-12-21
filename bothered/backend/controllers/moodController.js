import Mood from "../models/Mood.js";

// @desc Save user mood
// @route POST /api/moods
export const saveMood = async (req, res) => {
  try {
    const { userId, mood } = req.body;

    if (!userId || !mood) {
      return res.status(400).json({ message: "User and mood are required" });
    }

    const newMood = await Mood.create({
      user: userId,
      mood,
    });

    res.status(201).json({
      message: "Mood saved successfully",
      mood: newMood,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc Get moods of a user
// @route GET /api/moods/:userId
export const getUserMoods = async (req, res) => {
  try {
    const { userId } = req.params;

    const moods = await Mood.find({ user: userId }).sort({ date: 1 });

    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
