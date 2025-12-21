import { sendEmail } from "../utils/sendEmail.js";

export const sendAlertEmail = async (req, res) => {
  try {
    const { email, userName } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const message = `
Hello,

This is a gentle message from the Bothered app.

${userName} has been experiencing a difficult time emotionally.
They trusted you enough to list you as a support contact.

If possible, please check in with them.
Your presence could make a difference.

This is not an emergency message.

– Team Bothered
    `;

    await sendEmail(
      email,
      "A gentle check-in for someone you care about",
      message
    );

    res.status(200).json({ message: "Alert email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
