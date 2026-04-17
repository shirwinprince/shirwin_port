import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'
import { useState } from 'react'

export default function Contact() {
  const [ref, inView] = useInView(0.1)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', message: '' })

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' })
      return
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    setIsSending(true)

    try {
      const configuredApiUrl = import.meta.env.VITE_CONTACT_API_URL
      const endpointCandidates = configuredApiUrl
        ? [configuredApiUrl]
        : ['/api/contact', 'http://localhost:5000/api/contact']

      let response = null
      let data = {}
      let lastNetworkError = null

      for (const endpoint of endpointCandidates) {
        try {
          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          })

          const raw = await response.text()
          data = raw ? JSON.parse(raw) : {}
          break
        } catch (err) {
          if (err instanceof SyntaxError) {
            throw new Error('Contact server returned an invalid response.')
          }
          lastNetworkError = err
        }
      }

      if (!response) {
        throw lastNetworkError || new Error('Contact server is unreachable.')
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Unable to send your message right now.')
      }

      setForm({ name: '', email: '', message: '' })
      setStatus({
        type: 'success',
        message: data?.message || 'Message sent successfully. I will get back to you soon.',
      })
    } catch (error) {
      const isNetworkError =
        error?.name === 'TypeError' ||
        (typeof error?.message === 'string' && error.message.toLowerCase().includes('fetch'))

      setStatus({
        type: 'error',
        message: isNetworkError
          ? 'Contact server is unreachable. Please make sure the backend is running.'
          : error.message || 'Failed to send message. Please try again later.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-[#FDFDF5]"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="container-main relative z-10" ref={ref}>
        {/* ── Heading with tilted badge ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-block font-mono text-[11px] font-black text-black uppercase tracking-widest bg-[#F4FF3A] border-[3px] border-black px-3 py-1"
              style={{ transform: 'rotate(-3deg)', boxShadow: '4px 4px 0 0 #000' }}
            >
              START A PROJECT
            </span>
          </div>
          <h2
            className="font-mono text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-black leading-none"
          >
            LET&apos;S TALK AI.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-mono text-[14px] text-[#555] mb-14 max-w-lg"
        >
          Actively seeking full-time opportunities in Machine Learning and AI Engineering.
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
          {/* ── Left: Contact info ─────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Email */}
            <a
              href="mailto:shirwinprince@gmail.com"
              className="group block"
            >
              <div className="flex items-center gap-4 p-5 border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150">
                <svg className="text-black shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="0" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <div>
                  <span className="block font-mono text-[10px] text-[#999] uppercase tracking-wider font-bold">Email</span>
                  <span className="font-mono text-[13px] text-black font-black">shirwinprince@gmail.com</span>
                </div>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-center gap-4 p-5 border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150">
                <svg className="text-black shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <div>
                  <span className="block font-mono text-[10px] text-[#999] uppercase tracking-wider font-bold">LinkedIn</span>
                  <span className="font-mono text-[13px] text-black font-black">linkedin.com/in/shirwinprince</span>
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-center gap-4 p-5 border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150">
                <svg className="text-black shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <div>
                  <span className="block font-mono text-[10px] text-[#999] uppercase tracking-wider font-bold">GitHub</span>
                  <span className="font-mono text-[13px] text-black font-black">github.com/shirwinprince</span>
                </div>
              </div>
            </a>

            {/* Location / Status */}
            <div>
              <div className="flex items-center gap-4 p-5 border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-black text-lg shrink-0">📍</span>
                <div>
                  <span className="block font-mono text-[10px] text-[#999] uppercase tracking-wider font-bold">Location</span>
                  <span className="font-mono text-[13px] text-black font-black">India / Remote</span>
                </div>
                <span
                  className="ml-auto inline-flex items-center gap-2 border-[3px] border-black px-3 py-1 bg-[#F4FF3A] font-mono text-[11px] text-black font-black"
                  style={{ boxShadow: '3px 3px 0 0 #000' }}
                >
                  <span className="w-2 h-2 bg-[#22C55E]" />
                  Available
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Contact form ────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div>
              <div className="border-[3px] border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-mono text-[10px] text-black uppercase tracking-wider mb-2 font-black">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      data-cursor="input"
                      className="w-full px-4 py-3.5 bg-white border-[3px] border-black font-mono text-[13px] text-black placeholder:text-[#aaa] placeholder:font-bold focus:bg-[#F4FF3A]/15 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-black uppercase tracking-wider mb-2 font-black">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      data-cursor="input"
                      className="w-full px-4 py-3.5 bg-white border-[3px] border-black font-mono text-[13px] text-black placeholder:text-[#aaa] placeholder:font-bold focus:bg-[#F4FF3A]/15 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-black uppercase tracking-wider mb-2 font-black">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      data-cursor="input"
                      className="w-full px-4 py-3.5 bg-white border-[3px] border-black font-mono text-[13px] text-black placeholder:text-[#aaa] placeholder:font-bold focus:bg-[#F4FF3A]/15 focus:outline-none transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full px-8 py-3.5 bg-[#3B82F6] border-[3px] border-black font-mono text-[13px] font-black text-white uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 cursor-pointer"
                  >
                    {isSending ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>

                  {status.message && (
                    <div
                      className={`border-[3px] border-black px-4 py-3 font-mono text-[12px] font-black uppercase tracking-wide ${
                        status.type === 'success' ? 'bg-[#D9F99D] text-black' : 'bg-[#FECACA] text-black'
                      }`}
                    >
                      {status.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
