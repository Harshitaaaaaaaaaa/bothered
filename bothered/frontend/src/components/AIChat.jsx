import { useState } from "react";
import axios from "axios";

function AIChat({ onBack }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi I am Luma💚 I’m here to listen. What’s been on your mind?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        message: userText,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "I’m here 💚 but I’m having trouble right now." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-emerald-900 text-white flex justify-center px-4 py-6">
      <div className="w-full max-w-3xl flex flex-col">

        {/* HEADER */}
        <header className="bg-emerald-800 rounded-3xl p-5 shadow-lg mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            💬 Luma Here-Your AI Companion
          </h1>
          <p className="text-white/75 text-sm">
            A safe, judgment-free space to talk
          </p>
        </header>

        {/* CHAT AREA */}
        <main className="flex-1 overflow-y-auto space-y-4 px-2 pb-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[75%] p-4 rounded-2xl text-sm shadow
                ${
                  m.sender === "ai"
                    ? "bg-emerald-50 text-black self-start"
                    : "bg-emerald-700 text-white self-end ml-auto"
                }`}
            >
              {m.text}
            </div>
          ))}

          {loading && (
            <div className="bg-emerald-50 text-black p-3 rounded-xl w-fit shadow">
              Typing…
            </div>
          )}
        </main>

        {/* INPUT */}
        <footer className="mt-2 bg-emerald-800 rounded-2xl p-4 shadow-lg">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type how you feel…"
              className="
                flex-1 px-4 py-2.5 rounded-xl
                bg-white text-black
                outline-none
                focus:ring-2 focus:ring-emerald-500
              "
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="
                px-5 py-2.5 rounded-xl
                bg-emerald-700 text-white font-semibold
                hover:bg-emerald-800
                transition
                disabled:opacity-60
              "
            >
              Send
            </button>
          </div>

          <button
            onClick={onBack}
            className="mt-3 text-sm underline text-white/80 hover:text-white transition"
          >
            ← Back
          </button>
        </footer>

      </div>
    </div>
  );
}

export default AIChat;
