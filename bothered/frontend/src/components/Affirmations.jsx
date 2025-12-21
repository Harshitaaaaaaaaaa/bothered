import { useState } from "react";

const affirmations = [
  "🌿 I am doing the best I can, and that is enough.",
  "✨ I deserve peace, rest, and kindness.",
  "💚 My feelings are valid, even on hard days.",
  "🌱 I am growing at my own pace.",
  "🌸 This moment does not define my whole story.",
  "☀️ I choose to be gentle with myself today.",
  "🫶 I am allowed to take breaks and ask for help.",
  "🌊 Like waves, my emotions will pass.",
  "🍃 I am safe, I am breathing, I am here.",
  "💫 Small steps still move me forward."
];

function Affirmations({ onBack }) {
  const [index, setIndex] = useState(
    Math.floor(Math.random() * affirmations.length)
  );

  const nextAffirmation = () => {
    setIndex((prev) => (prev + 1) % affirmations.length);
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Glass card */}
      <div
        className="relative z-10 w-full max-w-md mx-4
        backdrop-blur-xl bg-white/10 border border-white/20
        rounded-3xl p-10 shadow-2xl text-center"
      >
        <h1 className="text-3xl font-extrabold mb-6">
          🌱 Positive Affirmations
        </h1>

        <p className="text-xl leading-relaxed mb-10 text-white/90">
          {affirmations[index]}
        </p>

        <button
          onClick={nextAffirmation}
          className="w-full py-3 rounded-full
          bg-emerald-600 font-semibold
          hover:bg-emerald-700 transition"
        >
          ✨ Next Affirmation
        </button>

        <button
          onClick={onBack}
          className="mt-8 text-white/70 underline"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default Affirmations;
