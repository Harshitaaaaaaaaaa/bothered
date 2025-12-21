import bcrypt from "bcryptjs";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

/* ================= SIGNUP ================= */
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpires: Date.now() + 10 * 60 * 1000, // 10 min
  });

  await sendEmail(
    email,
    "Your OTP for Bothered 🌱",
    `Your OTP is ${otp}. It is valid for 10 minutes.`
  );

  res.status(201).json({ userId: user._id });
};

/* ================= VERIFY OTP ================= */
export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  const user = await User.findById(userId);

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
