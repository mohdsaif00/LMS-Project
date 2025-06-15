// Import nodemailer, a tool to send emails from Node.js
import nodemailer from 'nodemailer'

// Create a transporter using nodemailer.
// This tells nodemailer which service to use and how to authenticate.

const transfer = nodemailer.createTransport({ 
    service: 'Gmail', // We're using Gmail's service to send emails
    auth: { // Authentication details for Gmail
        user:'your.email@example.com', // Your Gmail address
        pass:'your-app-password' // Your Gmail App Password (not your normal password!)
    }
});

// Export the transporter so we can reuse it in other files
module.exports = transfer;