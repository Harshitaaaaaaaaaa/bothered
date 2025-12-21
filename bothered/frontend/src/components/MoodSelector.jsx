import { useState } from "react";
import api from "../api/api"; // ← replaced axios import ONLY

const moods = [
  { label: "Happy", emoji: "😊" },
  { label: "Okay", emoji: "😐" },
  { label: "Sad", emoji: "😔" },
  { label: "Angry", emoji: "😠" },
  { label: "Anxious", emoji: "😰" },
  { label: "Stressed", emoji: "😣" },
];

function MoodSelector({ user, onDone }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [status, setStatus] = useState("");

  const handleMoodClick = async (mood) => {
    setSelectedMood(mood);
    setStatus("Saving...");

    try {
      await api.post("/api/moods", {
        userId: user._id,
        mood,
      });

      setStatus("Mood saved 💚");
    } catch (error) {
      setStatus("Failed to save mood 😔");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-900">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-extrabold text-emerald-700 text-center mb-2">
          Hi, {user.name} 👋
        </h1>

        <p className="text-center text-gray-600 mb-8">
          How are you feeling today?
        </p>

        <div className="grid grid-cols-3 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => handleMoodClick(mood.label)}
              className={`p-4 rounded-2xl border transition
                ${
                  selectedMood === mood.label
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 hover:bg-emerald-100"
                }`}
            >
              <div className="text-3xl">{mood.emoji}</div>
              <div className="mt-1 font-medium">{mood.label}</div>
            </button>
          ))}
        </div>

        {status && (
          <p className="mt-6 text-center font-medium text-gray-700">
            {status}
          </p>
        )}

        {/* ✅ CONTINUE BUTTON */}
        {status === "Mood saved 💚" && (
          <button
            onClick={onDone}
            className="mt-8 w-full py-3 rounded-xl text-white text-lg font-semibold
              bg-gradient-to-r from-emerald-600 via-teal-600 to-lime-600
              hover:from-emerald-700 hover:via-teal-700 hover:to-lime-700
              transition-all duration-300 shadow-lg"
          >
            Done 🌿
          </button>
        )}
      </div>
    </div>
  );
}

export default MoodSelector;
