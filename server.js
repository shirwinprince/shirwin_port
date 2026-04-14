import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint for sending email
app.post('/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Send email via Resend
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend sandbox sender
      to: process.env.RECIPIENT_EMAIL, // Your Gmail address
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Message from Your Portfolio</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p><strong>Message:</strong></p>
            <p style="color: #555; line-height: 1.6;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});

// Helper function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}