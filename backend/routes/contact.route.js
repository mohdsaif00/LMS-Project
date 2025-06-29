import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.SMTP_USERNAME, // your email
      subject: `New Contact from ${name}`,
      text: message
    });

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to send email", error: err.message });
  }
});

export default router;