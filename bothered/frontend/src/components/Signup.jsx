import { useState } from "react";
import axios from "axios";

function Signup({ onSignup, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState("");

  const signup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { name, email, password }
      );
      setUserId(res.data.userId);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { userId, otp }
      );
      onSignup(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-emerald-800 px-4 overflow-hidden">

      {/* 🏢 SINGLE COMPANY LOGO BACKGROUND */}
      <img
        src="/bothered.png"
        alt="Bothered logo"
        className="
          absolute
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[280px] md:w-[360px]
          opacity-10
          pointer-events-none
          select-none
        "
      />

      {/* SIGNUP CARD */}
      <div className="relative bg-white w-full max-w-md p-10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] z-10">

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold mb-2 text-center text-emerald-800 flex items-center justify-center gap-2">
          🌱 Sign Up
        </h1>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Begin your journey to better mental well-being
        </p>

        {!userId ? (
          <>
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
              className="
                w-full py-3 rounded-xl
                bg-emerald-800 text-white font-semibold text-lg
                hover:bg-emerald-900 transition
              "
            >
              Send OTP
            </button>

            <div className="mt-4 text-xs text-gray-600 text-center leading-relaxed">
              🔐 A one-time code will be sent to your email  
              <br />
              Your password is safely encrypted
            </div>

            <div className="mt-5 text-center text-sm text-gray-700">
              Already have an account?{" "}
              <button
                onClick={onLogin}
                className="text-emerald-800 font-semibold underline hover:text-emerald-900"
              >
                Login
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="
                w-full mb-5 p-3 rounded-xl text-center tracking-widest
                border border-emerald-200
                text-black placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-emerald-600
              "
            />

            <button
              onClick={verifyOtp}
              className="
                w-full py-3 rounded-xl
                bg-emerald-800 text-white font-semibold text-lg
                hover:bg-emerald-900 transition
              "
            >
              Verify OTP
            </button>

            <div className="mt-5 text-xs text-gray-600 text-center">
              Didn’t receive the code?  
              <br />
              Please wait or check spam ⏳
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;
