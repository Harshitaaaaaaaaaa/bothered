function Home({ user, onNavigate }) {
  const quote = "You are stronger than you think, even on the quiet days 🌿";

  const features = [
    {
      key: "calendar",
      title: "Mood Calendar",
      emoji: "📅",
      desc: "Track emotions and notice patterns over time.",
    },
    {
      key: "meditation",
      title: "Meditation",
      emoji: "🧘",
      desc: "Slow down your breath and calm your mind.",
    },
    {
  key: "chat",
  title: "Talk to Luma",
  emoji: "💬",
  desc: "Luma is here to listen, safely and without judgment.",
},
    {
      key: "affirmations",
      title: "Affirmations",
      emoji: "🌱",
      desc: "Gentle reminders to lift your heart.",
    },
    {
      key: "helpline",
      title: "Mental Health Support",
      emoji: "📞",
      desc: "Help is one call away when it feels heavy.",
    },
    {
      key: "contact",
      title: "Contact a Friend",
      emoji: "👥",
      desc: "Reach out to someone who cares.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-emerald-900 text-white overflow-hidden">

      {/* 🌿 Floating Leaf Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="leaf"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              fontSize: `${18 + Math.random() * 26}px`,
            }}
          >
            🍃
          </span>
        ))}
      </div>

      {/* ================= HEADER ================= */}
      <header className="relative px-10 py-8 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl font-bold mb-1">
              Hello, {user.name} 🤍
            </h1>
            <p className="text-white/80 italic max-w-2xl">
              “{quote}”
            </p>
          </div>

          {/* RIGHT – BOTHERED */}
          <div
            
            className="
              flex items-center gap-3
              cursor-pointer
              bg-white/10 px-5 py-2 rounded-full
             
            "
          >
            <span className="text-lg font-semibold">
              Bothered?
            </span>
            <img
              src="/bothered.png"
              alt="bothered"
              className="w-15 h-15"
            />
          </div>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="relative z-10 px-6 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto">

          {/* Hero Panel */}
          <div className="bg-white text-black rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] mb-16">
            <h2 className="text-3xl font-bold mb-3">
              What would help you right now?
            </h2>
            <p className="text-black/70 max-w-xl">
              Choose what feels right for you today. There’s no pressure.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((item) => (
              <div
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className="
                  bg-white text-black
                  rounded-2xl p-8
                  flex items-start gap-6
                  cursor-pointer
                  shadow-[0_20px_40px_rgba(0,0,0,0.25)]
                  hover:shadow-[0_35px_80px_rgba(0,0,0,0.35)]
                  hover:-translate-y-2
                  transition-all duration-300
                "
              >
                <div className="text-4xl">{item.emoji}</div>

                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-black/70">
                    {item.desc}
                  </p>
                  <div className="mt-4 font-semibold text-emerald-900">
                    Open →
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 text-center text-white/70 py-6 text-sm">
        🌿 You are not weak for needing help • One step at a time
      </footer>

      {/* 🌿 CSS Animations */}
      <style>{`
        .leaf {
          position: absolute;
          top: -10%;
          opacity: 0.25;
          animation: floatLeaf 18s linear infinite;
        }

        @keyframes floatLeaf {
          0% {
            transform: translateY(-10vh) rotate(0deg);
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
          }
        }
      `}</style>

    </div>
  );
}

export default Home;
