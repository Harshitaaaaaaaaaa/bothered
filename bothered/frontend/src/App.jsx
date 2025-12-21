import { useState } from "react";

import Signup from "./components/Signup";
import Login from "./components/Login";
import MoodSelector from "./components/MoodSelector";
import Home from "./components/Home";
import MoodCalendar from "./components/MoodCalendar";
import AIChat from "./components/AIChat";
import Meditation from "./components/Meditation";
import Affirmations from "./components/Affirmations";
import Helpline from "./components/Helpline";
import ContactFriend from "./components/ContactFriend";

function App() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState("signup");

  /* ================= AUTH ================= */

  if (step === "signup") {
    return (
      <Signup
        onSignup={(u) => {
          setUser(u);
          setStep("mood");
        }}
        onLogin={() => setStep("login")}   // ✅ FIX
      />
    );
  }

  if (step === "login") {
    return (
      <Login
        onLogin={(u) => {
          setUser(u);
          setStep("home");
        }}
        onBackToSignup={() => setStep("signup")}
      />
    );
  }

  /* ================= APP FLOW ================= */

  if (step === "mood") {
    return (
      <MoodSelector
        user={user}
        onDone={() => setStep("home")}
      />
    );
  }

  if (step === "calendar") {
    return (
      <MoodCalendar
        user={user}
        onBack={() => setStep("home")}
      />
    );
  }

  if (step === "chat") {
    return <AIChat onBack={() => setStep("home")} />;
  }

  if (step === "meditation") {
    return <Meditation onBack={() => setStep("home")} />;
  }

  if (step === "affirmations") {
    return <Affirmations onBack={() => setStep("home")} />;
  }

  if (step === "helpline") {
    return <Helpline onBack={() => setStep("home")} />;
  }

  if (step === "contact") {
  return (
    <ContactFriend
      user={user}
      onBack={() => setStep("home")}
    />
  );
}

  /* ================= HOME ================= */

  return (
    <Home
      user={user}
      onNavigate={(page) => setStep(page)}
    />
  );
}

export default App;
