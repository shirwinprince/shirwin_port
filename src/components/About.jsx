import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'

export default function About() {
  const [ref, inView] = useInView(0.15)

  return (
    <section
      id="about"
      className="relative py-28 lg:py-36 bg-[#FDFDF5]"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-8 lg:px-24 relative z-10" ref={ref}>
        {/* Main card with thick border + hard shadow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_#000] relative"
        >
          <div className="grid lg:grid-cols-[400px_1fr] items-stretch">

            {/* ── Left: Large Profile Image ── */}
            <div className="relative border-r-[4px] border-black overflow-hidden bg-black">
              <img
                src="/pic.jpeg"
                alt="Shirwin Prince I"
                className="w-full h-full object-cover min-h-[350px] lg:min-h-[420px]"
              />
              {/* Red file label */}
              <span className="absolute top-4 left-4 bg-red-600 text-white font-mono text-[11px] font-black px-2.5 py-1 uppercase tracking-wide border-[2px] border-black">
                AVATAR.JPG
              </span>
            </div>

            {/* ── Right: Content ── */}
            <div className="p-10 lg:p-12 flex flex-col justify-center space-y-7">
              {/* Heading */}
              <h2 className="font-mono text-5xl md:text-6xl font-black text-black leading-none tracking-tight">
                WHO AM I?
              </h2>

              {/* Bio */}
              <p className="font-mono text-[16px] text-black/70 leading-[1.9] max-w-[560px]">
                I am <span className="font-black text-black">Shirwin Prince I</span>. An
                entry-level AI Engineer with hands-on experience designing data
                driven systems and{' '}
                <span className="bg-[#F4FF3A] px-1.5 py-0.5 font-black text-black border border-black/20">
                  intelligent
                </span>{' '}
                applications.
              </p>

              {/* Skill bullets with purple/violet left border */}
              <div className="space-y-2 border-l-[4px] border-purple-400 pl-5">
                <p className="font-mono text-[14px] text-black/50 leading-[1.8]">
                  <span className="text-black font-black mr-1.5">{'>'}</span>
                  Specialized in Machine Learning, Deep Learning, and NLP.
                </p>
                <p className="font-mono text-[14px] text-black/50 leading-[1.8]">
                  <span className="text-black font-black mr-1.5">{'>'}</span>
                  Experience building end to end AI applications using Flask & Streamlit.
                </p>
                <p className="font-mono text-[14px] text-black/50 leading-[1.8]">
                  <span className="text-black font-black mr-1.5">{'>'}</span>
                  Strong foundation in Python, predictive modeling, and model deployment.
                </p>
              </div>

              {/* Status badges — inline, side by side */}
              <div className="flex flex-wrap gap-4 pt-2">
                {/* LOCATION */}
                <div className="flex items-center gap-2.5 bg-black px-5 py-3 border-[3px] border-black">
                  <span className="text-[16px]">📍</span>
                  <span className="font-mono text-[13px] text-white font-black tracking-wide uppercase">
                    LOCATION: INDIA / REMOTE
                  </span>
                </div>
                {/* STATUS */}
                <div className="flex items-center gap-2.5 bg-[#22C55E] px-5 py-3 border-[3px] border-black">
                  <span className="w-2.5 h-2.5 bg-green-300 border border-black/30 inline-block"></span>
                  <span className="font-mono text-[13px] text-black font-black tracking-wide uppercase">
                    STATUS: AVAILABLE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
