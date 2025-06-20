import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USERNAME, // Your email address
    pass: process.env.SMTP_PASSWORD, // Use App Password if using Gmail
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 528dc6ddd26f0f9eb55dba76bb6e4d60c0642129
