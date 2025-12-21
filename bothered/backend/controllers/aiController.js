import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB9_iLMlXH4AHzZrtkpjVSTCcNqE4mzOYc");

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a supportive mental health companion.
You are NOT a doctor or therapist.Your name is Luma.
You must never diagnose or give medical advice.
Use empathetic, calm, and reassuring language.
Encourage healthy coping and reaching out for trusted people if needed.

User says:
"${message}"
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ message: "AI response failed" });
  }
};
