import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'

const projects = [
  {
    title: 'SIGN LANGUAGE DETECTION',
    description: 'Multi-stage system to detect numbers, alphabets, and words using MediaPipe for hand landmark extraction, CNN for spatial features, and LSTM for temporal sequence recognition.',
    tags: ['Python', 'TensorFlow', 'CNN', 'LSTM', 'OpenCV', 'Flask'],
    color: 'bg-blue',
    status: 'ACTIVE',
    sticker: 'DEEP LEARNING',
    link: "https://github.com/shirwinprince/sign_language_ASL_UNI"
  },
  {
    title: 'SENTIFYY',
    description: 'NLP-based sentiment analysis system using Logistic Regression with an integrated RAG chatbot for context-aware responses and document retrieval pipelines.',
    tags: ['Python', 'NLP', 'SQL', 'Streamlit', 'Flask', 'scikit-learn'],
    color: 'bg-pink',
    status: 'ACTIVE',
    sticker: 'NLP / RAG',
    link: "https://github.com/shirwinprince/sentifyy"
  },
  {
    title: 'BONE FRACTURE DETECTION',
    description: 'Implemented a CNN-based medical image classification system for detecting bone fractures from X-ray images with high accuracy and a user-friendly interface.',
    tags: ['Python', 'TensorFlow', 'Keras', 'CNN', 'OpenCV', 'Flask'],
    color: 'bg-accent',
    status: 'ACTIVE',
    sticker: 'CNN',
    link: "https://github.com/shirwinprince/Bone-fracture-detection-"
  },
  {
    title: 'RETAIL PRICE ANALYZER',
    description: 'Created a retail price prediction system using Decision Tree Regression with an interactive Streamlit dashboard for real-time price analysis and visualization.',
    tags: ['Python', 'Streamlit', 'scikit-learn', 'Decision Tree', 'Pandas'],
    color: 'bg-blue',
    status: 'ARCHIVED',
    sticker: 'ML',
    link: "https://github.com/shirwinprince/price-predictor-explorer"
  },
  {
    title: 'SKU CLUSTERING',
    description: 'Performed SKU-level product clustering using K-Means and DBSCAN algorithms to segment retail inventory for optimized pricing and demand forecasting.',
    tags: ['Python', 'K-Means', 'DBSCAN', 'scikit-learn', 'Pandas', 'Plotly'],
    color: 'bg-pink',
    status: 'ARCHIVED',
    sticker: 'CLUSTERING',
    link: "https://github.com/shirwinprince"
  },
  {
  title: 'EYEVISION AI',
  description: 'Architected a deep learning platform using fine-tuned ResNet50 CNNs to classify retinal diseases. Features a full-stack medical portal with Flask/React, real-time health chatbots, and automated clinical PDF reporting.',
  tags: ['ResNet50', 'Python', 'Flask', 'React.js', 'Tailwind CSS', 'SQLite', 'Deep Learning'],
  color: 'bg-cyan', // Or bg-blue / bg-emerald to match a medical/AI theme
  status: 'STABLE', // Since it's a full-stack architected platform
  sticker: 'MEDICAL_AI',
  link: "https://github.com/shirwinprince/eye-diseases-classification-report-dashboard-on-stremlit-"
},
{
  title: 'NLP TEXT VECTORIZER',
  description: 'Engineered a Natural Language Processing pipeline to transform raw text data into numerical features using CountVectorizer. Implemented tokenization and linguistic preprocessing to prepare datasets for supervised machine learning models.',
  tags: ['NLP', 'Python', 'Scikit-learn', 'CountVectorizer', 'Pandas', 'Text Mining'],
  color: 'bg-purple', // Purple is often used for NLP and Language models
  status: 'COMPLETED',
  sticker: 'TEXT_ANALYSIS',
  link: "https://github.com/shirwinprince/NLP_projects"
},

{
  title: 'SLEEP AND LIFESTYLE ANALYZER',
  description: 'Our objective is to identify sleep disorders across diverse fields, analyze their associated data and performance metrics, implement various algorithms, and explore findings through data visualization.',
  tags: ['Python', 'Streamlit', 'scikit-learn', 'Decision Tree', 'Pandas'],
  color: 'bg-purple', // Purple is often used for NLP and Language models
  status: 'COMPLETED',
  sticker: 'SLEEP_DISORDER ANALYSIS',
  link: "https://github.com/shirwinprince/datascience_project/blob/main/1st%20project%20for%20ml.ipynb"
},
]

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.08 * index }}
      className="group"
    >
      <div data-cursor="view" className="relative bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150">
        {/* Corner sticker badge — tilted */}
        {project.sticker && (
          <span
            className="absolute -top-3 -right-3 z-10 font-mono text-[9px] font-black text-black uppercase tracking-widest bg-[#F4FF3A] border-[3px] border-black px-2.5 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            style={{ transform: 'rotate(-3deg)' }}
          >
            {project.sticker}
          </span>
        )}

        {/* Image / visual area */}
        <div className={`relative h-48 sm:h-56 ${project.color} bg-opacity-20 border-b-[4px] border-black overflow-hidden`}>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-[3rem] sm:text-[4rem] font-black text-black/8 leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Status tag */}
          <span className={`absolute top-3 left-3 font-mono text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border-[2px] border-black ${
            project.status === 'ACTIVE' ? 'bg-[#22C55E] text-black' : 'bg-black text-white'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 className="font-mono text-lg sm:text-xl font-black text-black mb-2 leading-tight uppercase">
            {project.title}
          </h3>

          <p className="font-mono text-[12px] text-black/60 leading-[1.75] mb-4">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 font-mono text-[9px] font-bold text-white bg-black tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action row — VIEW DATABASE + GITHUB */}
          <div className="flex items-center gap-3 pt-4 border-t-[3px] border-black">
            <a
              href="https://github.com/shirwinprince"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-black border-[3px] border-black text-white font-mono text-[11px] font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
              aria-label={`View ${project.title}`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
              VIEW DATABASE
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-white border-[3px] border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
              aria-label={`View source for ${project.title}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView(0.03)

  return (
    <section id="projects" className="relative py-28 lg:py-36 bg-[#F4FF3A]">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-24 relative z-10" ref={ref}>
        {/* Section title — brutalist stroke heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2
            className="font-mono text-5xl sm:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight leading-none text-white"
            style={{
              WebkitTextStroke: '3px #000',
              paintOrder: 'stroke fill',
            }}
          >
            SELECTED WORKS
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 font-mono text-[13px] font-black text-white uppercase tracking-widest border-[3px] border-black bg-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.25)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.25)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            VIEW ALL REPOS
          </a>
        </motion.div>
      </div>
    </section>
  )
}

