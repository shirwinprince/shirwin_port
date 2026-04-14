import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'

const experiences = [
  {
    role: 'IT ASSISTANT INTERN',
    period: 'May 2023 – Jul 2023',
    company: 'Roots',
    bullets: [
      'Assisted in IT infrastructure management and technical support operations',
      'Gained hands-on experience with system administration and troubleshooting',
      'Collaborated with the team on maintaining and optimizing internal tools and processes',
    ],
  },
]

export default function Experience() {
  const [ref, inView] = useInView(0.1)

  return (
    <section
      id="experience"
      className="relative py-24 lg:py-32 bg-[#FDFDF5]"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="container-main relative z-10" ref={ref}>
        {/* Heading — hollow stroke */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2
            className="font-mono text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none text-transparent"
            style={{ WebkitTextStroke: '3px #000', paintOrder: 'stroke fill' }}
          >
            EXPERIENCE<span className="text-[#F4FF3A]" style={{ WebkitTextStroke: '3px #000' }}>_</span>LOG
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-6 lg:pl-8">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-black" />

          {/* Experience cards */}
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.15 }}
              className="relative mb-10 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-6 lg:-left-8 top-7 w-4 h-4 bg-[#F4FF3A] border-[3px] border-black" style={{ marginLeft: '-6px' }} />

              <div
                className="group border-[4px] border-black bg-white hover:translate-x-[2px] hover:translate-y-[2px] transition-transform duration-150"
                style={{ boxShadow: '6px 6px 0 0 #000' }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 pb-0 gap-2">
                  <h3 className="font-mono text-xl sm:text-2xl font-black text-black">
                    {exp.role}
                  </h3>
                  <span
                    className="font-mono text-[11px] text-black font-black border-[3px] border-black px-3 py-1 bg-[#F4FF3A] shrink-0 w-fit"
                    style={{ boxShadow: '3px 3px 0 0 #000' }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Company */}
                <div className="px-6 pt-2 pb-1">
                  <span className="font-mono text-[13px] text-black/60">
                    <span className="font-black text-black">@</span> {exp.company}
                  </span>
                </div>

                {/* Bullets */}
                <div className="p-6 pt-4">
                  <ul className="space-y-3">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-black text-[13px] mt-0.5 shrink-0 font-black">▪</span>
                        <span className="font-mono text-[13px] text-black/60 leading-[1.7]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-6 lg:-left-8 top-7 w-4 h-4 bg-[#EC4899] border-[3px] border-black" style={{ marginLeft: '-6px' }} />

            <div
              className="group border-[4px] border-black bg-white hover:translate-x-[2px] hover:translate-y-[2px] transition-transform duration-150"
              style={{ boxShadow: '6px 6px 0 0 #000' }}
            >
              {/* Label */}
              <div className="px-6 pt-6 pb-3">
                <span className="font-mono text-[10px] text-black/40 tracking-widest font-black">{'/// EDUCATION_LOG'}</span>
              </div>

              <div className="px-6 pb-2">
                <h3 className="font-mono text-xl sm:text-2xl font-black text-black">
                  M.SC. SOFTWARE SYSTEMS
                </h3>
              </div>

              <div className="px-6 pb-4">
                <span className="font-mono text-[13px] text-black/60">
                  <span className="font-black text-black">@</span> KG College of Arts and Science
                </span>
              </div>

              <div className="px-6 pb-6">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 border-[3px] border-black bg-[#F4FF3A] font-mono text-[12px]"
                  style={{ boxShadow: '3px 3px 0 0 #000' }}
                >
                  <span className="text-black/60 font-bold">CGPA:</span>
                  <span className="text-black font-black">8.62 / 10</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
