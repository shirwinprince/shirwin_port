import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'
import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    id: '001',
    year: '2025',
    from: 'PROFESSOR @ KG COLLEGE',
    text: 'Exceptional ML skills. His approach to CNN-based detection systems shows strong understanding of deep learning architectures.',
    accent: '#3B82F6',
    stars: 5,
  },
  {
    id: '002',
    year: '2025',
    from: 'MENTOR @ ROOTS',
    text: 'Impressive work ethic during the internship. Quick learner with strong technical problem-solving abilities.',
    accent: '#EC4899',
    stars: 5,
  },
  {
    id: '003',
    year: '2025',
    from: 'PEER @ KG COLLEGE',
    text: 'Strong NLP expertise. His sentiment analysis platform with RAG chatbot integration was a standout project.',
    accent: '#A855F7',
    stars: 5,
  },
  {
    id: '004',
    year: '2025',
    from: 'COLLABORATOR @ ACADEMIC PROJECT',
    text: 'Expert at data preprocessing and feature engineering. ML pipeline for retail price prediction was seamless.',
    accent: '#F59E0B',
    stars: 4,
  },
  {
    id: '005',
    year: '2025',
    from: 'PEER @ KG COLLEGE',
    text: 'Great understanding of clustering algorithms. His SKU segmentation project demonstrated solid analytical thinking.',
    accent: '#22C55E',
    stars: 5,
  },
]

function Stars({ count, color }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i < count ? color : '#222'}
          className="shrink-0"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [ref, inView] = useInView(0.1)
  const scrollRef = useRef(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let id
    const step = () => {
      if (!paused && el) {
        el.scrollLeft += 0.5
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
      }
      id = requestAnimationFrame(step)
    }
    id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [paused])

  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="relative py-24 lg:py-32 bg-black">
      <div className="container-main" ref={ref}>
        {/* ── Terminal title bar ────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-4 border border-white/10 bg-[#0a0a0a] px-5 py-2.5 backdrop-blur-sm">
            {/* Traffic-light dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <span className="font-mono text-[13px] text-white font-bold tracking-wider uppercase">
              USER_REPORTS.txt
            </span>
            <span className="font-mono text-[9px] text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/30 px-2 py-0.5 tracking-widest uppercase">
              LIVE_FEED
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Horizontal scroll ───────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.25 }}
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="overflow-hidden cursor-default"
      >
        <div className="flex gap-5 px-5" style={{ width: 'max-content' }}>
          {doubled.map((t, i) => {
            const src = testimonials[i % testimonials.length]
            return (
              <div
                key={i}
                className="relative w-80 sm:w-[380px] shrink-0 rounded-none"
                style={{ borderTop: `3px solid ${src.accent}` }}
              >
                {/* Glass card */}
                <div
                  className="h-full border border-white/10 border-t-0 backdrop-blur-sm p-5 flex flex-col"
                  style={{
                    background: 'linear-gradient(180deg, rgba(20,20,20,0.85) 0%, rgba(10,10,10,0.95) 100%)',
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-[11px] font-bold tracking-wider"
                      style={{ color: src.accent }}
                    >
                      REPORT_{src.id}.LOG
                    </span>
                    <span className="font-mono text-[10px] text-[#444] tracking-wider">
                      {src.year}.txt
                    </span>
                  </div>

                  {/* From */}
                  <p className="font-mono text-[10px] text-[#555] uppercase tracking-widest mb-4">
                    FROM: {src.from}
                  </p>

                  {/* Quote */}
                  <p className="font-mono text-[13px] text-white leading-[1.75] flex-1 mb-5">
                    &ldquo;{src.text}&rdquo;
                  </p>

                  {/* Stars */}
                  <Stars count={src.stars} color={src.accent} />
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* ── CTA ─────────────────────────────────── */}
      <div className="container-main mt-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-block px-8 py-3 font-mono text-[12px] font-bold text-white uppercase tracking-widest border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-colors duration-200 backdrop-blur-sm"
          >
            START A PROJECT
          </a>
        </motion.div>
      </div>
    </section>
  )
}
