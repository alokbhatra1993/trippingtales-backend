const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config(); // Load environment variables

// Route for sending email
router.post('/send-email', async (req, res) => {
  console.log({body:req.body});
  
  const { fullName, email, phoneNumber, message } = req.body;

  try {
    // Create the transporter using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // From your .env file
        pass: process.env.EMAIL_PASS, // From your .env file
      },
      logger: true,  // Enable debugging logs
      debug: true,   // Enable debugging
    });

    // Verify connection configuration asynchronously
    await transporter.verify(); // Verifies the transporter setup
    console.log('SMTP Server is ready to take messages');

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,  // Your email address (sender)
      to: 'alokbhatra1993@gmail.com',  // Recipient's email address
      subject: `Request Callback from ${fullName}`, // Email subject
      html: `
        <h3>Request Callback Details:</h3>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Email sending error:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;
