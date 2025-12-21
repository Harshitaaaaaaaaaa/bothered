import { useEffect, useState } from "react";
import axios from "axios";
import { FiCalendar } from "react-icons/fi";

const moodEmoji = {
  Happy: "😊",
  Okay: "😐",
  Sad: "😔",
  Angry: "😠",
  Anxious: "😰",
  Stressed: "😣",
};

const lowMoods = ["Sad", "Anxious", "Stressed"];

const helplinesIndia = [
  {
    name: "Kiran (Govt. of India)",
    number: "1800-599-0019",
    desc: "24/7 national mental health helpline",
  },
  {
    name: "AASRA",
    number: "+91 9820466726",
    desc: "24/7 emotional support",
  },
  {
    name: "iCALL (TISS)",
    number: "+91 9152987821",
    desc: "Mon–Sat professional counseling",
  },
];

function MoodCalendar({ user, onBack }) {
  const [moods, setMoods] = useState([]);
  const [sadStreak, setSadStreak] = useState(0);
  const [emailSent, setEmailSent] = useState(false);

  // 🔹 NEW: current visible month
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    const fetchMoods = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/moods/${user._id}`
      );
      setMoods(res.data);
      calculateSadStreak(res.data);
    };
    fetchMoods();
  }, [user._id]);

  const calculateSadStreak = (data) => {
    let streak = 0;
    const sorted = [...data].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    for (let entry of sorted) {
      if (lowMoods.includes(entry.mood)) streak++;
      else break;
    }
    setSadStreak(streak);
  };

  const sendAlert = async () => {
    await axios.post("http://localhost:5000/api/alert/email", {
      email: "trustedperson@gmail.com",
      userName: user.name,
    });
    setEmailSent(true);
  };

  // 🔹 Mood mapping by YYYY-MM-DD
  const moodByDate = {};
  moods.forEach((entry) => {
    const d = new Date(entry.date);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    moodByDate[key] = entry.mood;
  });

  // 🔹 Month navigation
  const prevMonth = () => {
    setCurrentMonth(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(year, month + 1, 1)
    );
  };

  return (
    <div className="min-h-screen bg-emerald-900 text-white flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <FiCalendar className="text-3xl" />
          <div>
            <h1 className="text-2xl font-bold">Mood Calendar</h1>
            <p className="text-white/70 text-sm">
              A gentle snapshot of your emotions 🌿
            </p>
          </div>
        </div>

        {/* ALERT */}
        {sadStreak >= 3 && (
          <div className="bg-white text-black rounded-2xl p-4 mb-5 shadow-lg">
            <p className="font-semibold">
              💛 You’ve felt low for {sadStreak} days in a row
            </p>
            <p className="text-black/70 text-sm">
              Support is available. You’re not alone.
            </p>
          </div>
        )}

        {/* EMAIL */}
        {sadStreak >= 5 && (
          <div className="bg-white text-black rounded-2xl p-4 mb-6 shadow-lg">
            {!emailSent ? (
              <button
                onClick={sendAlert}
                className="w-full bg-emerald-900 text-white py-2 rounded-xl font-semibold
                           hover:bg-emerald-800 transition"
              >
                📧 Notify Trusted Contact
              </button>
            ) : (
              <p className="text-center font-semibold text-emerald-900">
                ✅ Email sent successfully
              </p>
            )}
          </div>
        )}

        {/* HELPLINES */}
        {sadStreak >= 3 && (
          <div className="bg-white text-black rounded-2xl p-5 mb-6 shadow-xl">
            <h2 className="font-bold mb-3">📞 Mental Health Support (India)</h2>
            <div className="space-y-3">
              {helplinesIndia.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-emerald-50 rounded-xl p-3"
                >
                  <div>
                    <p className="font-semibold">{h.name}</p>
                    <p className="text-sm text-black/60">{h.desc}</p>
                  </div>
                  <a href={`tel:${h.number}`} className="font-bold underline">
                    {h.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CALENDAR */}
        <div className="bg-white rounded-3xl p-5 shadow-2xl">

          {/* MONTH NAV */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="px-3 py-1 rounded-lg bg-emerald-100 text-black font-semibold"
            >
              ←
            </button>

            <h2 className="text-xl font-bold text-black">
              {currentMonth.toLocaleString("default", { month: "long" })} {year}
            </h2>

            <button
              onClick={nextMonth}
              className="px-3 py-1 rounded-lg bg-emerald-100 text-black font-semibold"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-sm font-semibold text-black/60 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={i}></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const key = `${year}-${month}-${day}`;
              const mood = moodByDate[key];

              return (
                <div
                  key={day}
                  className="h-16 rounded-xl bg-emerald-50 flex flex-col items-center justify-center
                             shadow hover:shadow-md transition"
                >
                  <span className="text-xs font-semibold text-black">
                    {day}
                  </span>
                  <span className="text-xl">
                    {mood ? moodEmoji[mood] : "•"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* BACK */}
        <button
          onClick={onBack}
          className="mt-6 text-sm underline text-white/80 hover:text-white"
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default MoodCalendar;
