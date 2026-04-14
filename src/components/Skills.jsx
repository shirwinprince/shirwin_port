import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'

const skills = [
  { category: 'LANGUAGE', name: 'PYTHON', slug: 'python' },
  { category: 'ML', name: 'SCIKIT LEARN', slug: 'scikit' },
  { category: 'DEEP LEARNING', name: 'TENSORFLOW', slug: 'tensorflow' },
  { category: 'DATA', name: 'PANDAS', slug: 'pandas' },
  { category: 'VISUALIZATION', name: 'MATPLOTLIB', slug: 'matplotlib' },
  { category: 'DATABASE', name: 'MYSQL', slug: 'mysql' },
  { category: 'COMPUTER VISION', name: 'OPEN CV', slug: 'opencv' },
  { category: 'VERSION_CONTROL', name: 'GIT', slug: 'git' },
  { category: 'ALGORITHM', name: 'XGBOOST', slug: 'xgboost' },
  { category: 'OPS', name: 'GITHUB', slug: 'github' },
  { category: 'WEB FRAMEWORK', name: 'FLASK', slug: 'flask' },
  { category: 'DEPLOYMENT', name: 'STREAMLIT', slug: 'streamlit' },
  { category: 'DOMAIN', name: 'NLP', slug: 'nlp' },
  { category: 'VISUALIZATION', name: 'SEABORN', slug: 'seaborn' },
  { category: 'ML/DL', name: 'TRANSFORMERS', slug: 'transformers' },
  { category: 'IMPLEMENTATION ', name: 'CI/CD', slug: 'CI/CD' },
  { category: 'CLOUD', name: 'Vertex', slug: 'Vertex' },
]

export default function Skills() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="skills" className="relative py-24 lg:py-32 bg-[#0a0a0a] tech-grid-bg">
      <div className="container-main relative z-10" ref={ref}>
        {/* Heading + Status row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-3"
        >
          <h2 className="font-mono text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-none">
            TECH<span className="text-[#00ff66]">_</span>STACK
          </h2>
          <span className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#00ff66]">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            {'/// SYSTEM_OPTIMIZED'}
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="h-[1px] bg-[#00ff6625] mb-8"
        />

        {/* Skills grid — 8 columns matching reference */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-[1px] bg-[#1a1a1a]">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.03 * i }}
              data-tech={skill.slug}
              tabIndex={0}
              className="tech-card group relative overflow-hidden bg-[#0d0d0d] px-4 py-5 border border-[#1f1f1f] transition-all duration-200 cursor-default outline-none"
            >
              <div className="tech-dot" />
              <div className="relative z-10 flex items-start gap-2">
                <span className="tech-prompt font-mono text-[11px] mt-0.5 shrink-0 text-[#00ff66] opacity-60 transition-colors duration-200">{'>_'}</span>
                <div className="min-w-0">
                  <span className="tech-cat block font-mono text-[8px] uppercase tracking-widest text-[#00ff66] opacity-70 transition-colors duration-200">{skill.category}</span>
                  <span className="tech-name block font-mono text-[13px] font-bold text-white mt-1 transition-colors duration-200">
                    {skill.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#1f1f1f] mt-8" />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex items-center justify-between px-1 py-3"
        >
          <span className="font-mono text-[11px] text-[#555]">TOTAL_NODES: {skills.length}</span>
          <span className="font-mono text-[11px] text-[#555]">MEMORY_USAGE: 128MB</span>
        </motion.div>
      </div>
    </section>
  )
}
