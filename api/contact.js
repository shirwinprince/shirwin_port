import { Resend } from 'resend'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body || {}

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: 'RESEND_API_KEY is not configured.' })
  }

  const toEmail = process.env.RECIPIENT_EMAIL
  if (!toEmail) {
    return res.status(500).json({ message: 'RECIPIENT_EMAIL is not configured.' })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const fromEmail = process.env.SENDER_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

  try {
    const safeName = escapeHtml(name.trim())
    const safeEmail = escapeHtml(email.trim())
    const safeMessage = escapeHtml(message.trim())

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email.trim(),
      subject: `Portfolio message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return res.status(200).json({ message: 'Thanks! Your message was sent successfully.' })
  } catch (error) {
    return res.status(500).json({ message: error?.message || 'Failed to send message.' })
  }
}
