import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Resend } from 'resend'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 5000)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:5174,https://shirwinprince.live,https://www.shirwinprince.live')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (no Origin header) and configured frontends.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Not allowed by CORS'))
    },
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: 'Server email key is not configured.' })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const toEmail = process.env.RECIPIENT_EMAIL || 'shirwinprince@gmail.com'
  const fromEmail = process.env.SENDER_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return res.status(200).json({ message: 'Thanks! Your message was sent successfully.' })
  } catch (error) {
    const errMessage = error?.message || 'Failed to send email from server.'
    return res.status(500).json({ message: errMessage })
  }
})

app.listen(port, () => {
  console.log(`Contact API running on http://localhost:${port}`)
})
