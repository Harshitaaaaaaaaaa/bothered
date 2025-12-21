import { useEffect, useRef, useState } from "react";

function Meditation({ onBack }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.7;

    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {
        alert("🔊 Please click once on the page to allow sound");
      });
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft === 0) {
      audioRef.current.pause();
      setIsPlaying(false);
      alert("✨ Meditation complete. Take this calm with you.");
      setTimeLeft(null);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative text-white"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-md mx-4
        backdrop-blur-xl bg-white/10 border border-white/20
        rounded-3xl p-10 shadow-2xl text-center">

        <h1 className="text-4xl font-extrabold mb-3">
          🧘‍♀️ Breathe & Be
        </h1>

        <p className="text-white/80 mb-8 leading-relaxed">
          Sit comfortably.  
          Inhale peace 🌬️  
          Exhale tension 🍃
        </p>

        {/* Timer */}
        {timeLeft !== null && (
          <div className="text-5xl font-bold mb-8 tracking-widest">
            {formatTime(timeLeft)}
          </div>
        )}

        {/* Timer buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {[5, 10, 15].map((m) => (
            <button
              key={m}
              onClick={() => startTimer(m)}
              className="px-6 py-2 rounded-full
              bg-white text-[#163226] font-semibold
              hover:bg-gray-100 transition"
            >
              {m} min
            </button>
          ))}
        </div>

        {/* Music control */}
        <button
          onClick={toggleMusic}
          className="w-full py-3 rounded-full
          bg-emerald-600 font-semibold
          hover:bg-emerald-700 transition"
        >
          {isPlaying ? "⏸ Pause Calm Music" : "▶️ Play Calm Music"}
        </button>

        {/* Back */}
        <button
          onClick={onBack}
          className="mt-8 text-white/70 underline"
        >
          ← Back to Home
        </button>
      </div>

      {/* Audio */}
      <audio ref={audioRef} src="/calm.mp3" loop />
    </div>
  );
}

export default Meditation;
