import bcrypt from "bcryptjs";
import User from "../models/User.js";

/* ================= SIGNUP ================= */
export const signup = async (req, res) => {
  console.log("🟡 [SIGNUP] Request received");

  try {
    const { name, email, password } = req.body;
    console.log("📩 [SIGNUP] Body:", { name, email, password: !!password });

    if (!name || !email || !password) {
      console.log("❌ [SIGNUP] Missing fields");
      return res.status(400).json({ message: "All fields required" });
    }

    console.log("🔍 [SIGNUP] Checking existing user...");
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("❌ [SIGNUP] User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("🔐 [SIGNUP] Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("💾 [SIGNUP] Creating user in database...");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("✅ [SIGNUP] User created successfully:", user._id);

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("🔥 [SIGNUP] Error occurred:");
    console.error(error);

    return res.status(500).json({ message: "Signup failed" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  console.log("🟡 [LOGIN] Request received");

  try {
    const { email, password } = req.body;
    console.log("📩 [LOGIN] Body:", { email, password: !!password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ [LOGIN] User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("🔐 [LOGIN] Comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ [LOGIN] Password mismatch for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ [LOGIN] Login successful:", user._id);

    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("🔥 [LOGIN] Error occurred:");
    console.error(error);

    return res.status(500).json({ message: "Login failed" });
  }
};
