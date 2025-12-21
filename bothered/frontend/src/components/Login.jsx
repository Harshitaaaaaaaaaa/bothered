import { useState } from "react";
import api from "../api/api"; // ← replaced axios import ONLY

function Login({ onLogin, onBackToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(
        "/api/auth/login",
        { email, password }
      );

      onLogin(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-800 px-4">
      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)]">

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold mb-2 text-center text-emerald-800 flex items-center justify-center gap-2">
          🌿Welcome Back
        </h1>

        <p className="text-center text-gray-600 mb-8 text-sm">
          It’s good to see you again
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full mb-4 p-3 rounded-xl
            border border-emerald-200
            focus:outline-none focus:ring-2 focus:ring-emerald-600
          "
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full mb-6 p-3 rounded-xl
            border border-emerald-200
            focus:outline-none focus:ring-2 focus:ring-emerald-600
          "
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={login}
          disabled={loading}
          className="
            w-full py-3 rounded-xl
            bg-emerald-800 text-white font-semibold text-lg
            hover:bg-emerald-900
            transition disabled:opacity-70
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FOOTER LINKS */}
        <div className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <button
            onClick={onBackToSignup}
            className="text-emerald-800 font-semibold underline hover:text-emerald-900"
          >
            Sign up
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center leading-relaxed">
          🔐 Your data is safe & encrypted  
          <br />
          Take things at your own pace
        </div>
      </div>
    </div>
  );
}

export default Login;
