import { useState } from "react";
import api from "../api/api";

function Signup({ onSignup, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signup = async () => {
    if (!name || !email || !password) {
      setMessage("❌ Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      setMessage("✅ Account created successfully!");

      // Give user visual feedback before moving ahead
      setTimeout(() => {
        onSignup(res.data.user);
      }, 800);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-emerald-800 px-4 overflow-hidden">
      {/* Background logo */}
      <img
        src="/bothered.png"
        alt="Bothered logo"
        className="
          absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[280px] md:w-[360px]
          opacity-10 pointer-events-none select-none
        "
      />

      {/* Card */}
      <div className="relative bg-white w-full max-w-md p-10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] z-10">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-emerald-800">
          🌱 Sign Up
        </h1>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Begin your journey to better mental well-being
        </p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full mb-3 p-3 rounded-xl
            border border-emerald-200
            text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-600
          "
        />

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full mb-3 p-3 rounded-xl
            border border-emerald-200
            text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-600
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full mb-5 p-3 rounded-xl
            border border-emerald-200
            text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-600
          "
        />

        <button
          onClick={signup}
          disabled={loading}
          className={`
            w-full py-3 rounded-xl
            font-semibold text-lg transition
            ${
              loading
                ? "bg-emerald-400 cursor-not-allowed text-white"
                : "bg-emerald-800 hover:bg-emerald-900 text-white"
            }
          `}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* Acknowledgement message */}
        {message && (
          <p className="mt-4 text-center text-sm text-emerald-700">
            {message}
          </p>
        )}

        <div className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <button
            onClick={onLogin}
            className="text-emerald-800 font-semibold underline hover:text-emerald-900"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
