import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const prompt = `
You are a supportive mental health companion.
You are NOT a doctor or therapist.
Your name is Luma.
You must never diagnose or give medical advice.
Use empathetic, calm, and reassuring language.
Encourage healthy coping and reaching out to trusted people if needed.

User says:
"${message}"
`;

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [
        {
          role: "system",
          content:
            "You are Luma, a calm and empathetic mental health companion.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Groq error:", error);
    res.status(500).json({ message: "AI response failed" });
  }
};
