import { motion } from 'framer-motion'

const marqueeItems = [
  'OPEN FOR WORK',
  'MACHINE LEARNING',
  'ARTIFICIAL INTELLIGENCE',
  'DATA DRIVEN',
  'DEEP LEARNING',
  'NLP SYSTEMS',
  'OPEN FOR WORK',
  'CNN ARCHITECTURES',
  'RAG PIPELINES',
  'PRODUCTION READY',
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#FDFDF5]"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Floating decorative shapes — hard shadow, no blur */}
      <motion.div
        className="absolute top-32 right-12 w-20 h-20 border-[3px] border-black bg-[#3B82F6] hidden lg:block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        animate={{ y: [0, -18, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-64 right-40 w-12 h-12 border-[3px] border-black bg-[#F472B6] rounded-full hidden lg:block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        animate={{ y: [0, -12, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main hero content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="container-main w-full pt-24 lg:pt-0">
          <div className="flex flex-col items-center text-center">
            {/* Status badge — centered white box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 font-mono text-xs text-black border-[3px] border-black px-4 py-2 bg-white font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="w-2.5 h-2.5 bg-[#22C55E] border border-black" />
                SYSTEM STATUS: ONLINE
              </span>
            </motion.div>

            {/* Heading — solid top + hollow bottom */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <h1 className="font-mono font-black tracking-tighter leading-[0.85]">
                <span className="block text-[clamp(3rem,8vw,7rem)] text-black">AI ML</span>
                <span
                  className="block text-[clamp(3rem,8vw,7rem)] text-transparent"
                  style={{ WebkitTextStroke: '3px #000', paintOrder: 'stroke fill' }}
                >ENGINEER</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="font-mono text-sm sm:text-base text-black/60 mb-2 max-w-md"
            >
              I build intelligent ML systems for real-world impact.
            </motion.p>

            {/* Tech line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-mono text-xs text-black/40 mb-10"
            >
              <span className="font-black text-black">Python</span> • <span className="font-black text-black">scikit-learn</span> • <span className="font-black text-black">TensorFlow</span> • <span className="font-black text-black">Flask</span>
            </motion.p>

            {/* CTA Buttons — press effect: translate + shadow shrink */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-5 mb-8"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-7 py-3 font-mono text-sm font-black text-white uppercase tracking-wider bg-[#3B82F6] border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
              >
                VIEW PROJECTS
              </a>
              <a
                href="https://drive.google.com/file/d/1m1p5VmGunKOGC5tEOd_WdwcZUeZEcxUo/view?usp=sharing"
                download
                className="px-7 py-3 font-mono text-sm font-black text-black uppercase tracking-wider bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                DOWNLOAD CV
              </a>
            </motion.div>

            {/* START A PROJECT — tilted sticker badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.55, type: 'spring', stiffness: 200 }}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-block font-mono text-[13px] font-black text-black uppercase tracking-widest bg-[#F4FF3A] border-[3px] border-black px-5 py-2 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 cursor-pointer"
                style={{ transform: 'rotate(-4deg)' }}
              >
                ★ START A PROJECT
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="border-y-[3px] border-black bg-[#F4FF3A] py-3 overflow-hidden"
      >
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center shrink-0 px-6 font-mono text-[11px] text-black font-black whitespace-nowrap tracking-wider">
              /// {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
