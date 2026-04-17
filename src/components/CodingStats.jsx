import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'
import { useState, useEffect } from 'react' // Added for dynamics

const DEFAULT_LEETCODE_PROFILE_URL = 'https://leetcode.com/u/shirwinprince/'
const configuredLeetcodeStatsApiBase = import.meta.env.VITE_LEETCODE_STATS_API_BASE_URL?.trim()

function getLeetcodeUsername(profileUrl) {
  const match = profileUrl.match(/leetcode\.com\/u\/([^/]+)/i)
  return match?.[1] || 'shirwinprince'
}

function buildLeetcodeStatsUrl(username) {
  if (!configuredLeetcodeStatsApiBase) return ''
  return configuredLeetcodeStatsApiBase
    .replace('{username}', encodeURIComponent(username))
    .replace(/\/$/, '')
}

/* ── tiny SVG icons (inline, no deps) ─────────────── */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LeetcodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
)

/* ── Heatmap grid ── */
function HeatmapGrid({ cols = 20, accent = '#00ff66' }) {
  const cells = Array.from({ length: 7 * cols }, (_, i) => {
    const v = ((i * 7 + 13) * 31) % 100
    if (v < 40) return 'bg-[#111]'
    if (v < 60) return 'bg-[#1a2a1a]'
    if (v < 80) return 'bg-[#1a3a1a]'
    return ''
  })
  return (
    <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: 'repeat(7, 1fr)' }}>
      {cells.map((cls, i) => (
        <div key={i} className={`aspect-square ${cls}`} style={cls === '' ? { backgroundColor: accent, opacity: ((i * 17) % 4 + 2) / 6 } : undefined} />
      ))}
    </div>
  )
}

/* ── Circular progress ring ── */
function ProgressRing({ done, max, size = 90, stroke = 5, color = '#ffa116' }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(done / (max || 1), 1)
  const offset = circ * (1 - pct)
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1f1f1f" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="square" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-white text-lg font-bold">{done}</span>
        <span className="font-mono text-[10px] text-[#555]">/ {max}</span>
      </div>
    </div>
  )
}

/* ── StatBox ── */
function StatBox({ label, value, accent = '#00ff66' }) {
  return (
    <div className="border border-[#1f1f1f] bg-[#0d0d0d] px-3 py-2">
      <span className="block font-mono text-[9px] uppercase tracking-widest text-[#555]">{label}</span>
      <span className="block font-mono text-base font-bold mt-0.5" style={{ color: accent }}>{value}</span>
    </div>
  )
}

/* ── DifficultyBar ── */
function DifficultyBar({ label, done, total, color }) {
  const pct = Math.round((done / (total || 1)) * 100)
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[11px] w-16 text-[#888]">{label}</span>
      <div className="flex-1 h-[6px] bg-[#1a1a1a]">
        <div className="h-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="font-mono text-[11px] text-white w-14 text-right">{done}/{total}</span>
    </div>
  )
}

export default function CodingStats() {
  const [ref, inView] = useInView(0.1)
  const leetcodeProfileUrl = import.meta.env.VITE_LEETCODE_PROFILE_URL || DEFAULT_LEETCODE_PROFILE_URL
  const leetcodeUsername = getLeetcodeUsername(leetcodeProfileUrl)

  // DYNAMIC STATES
  const [github, setGithub] = useState({
    username: 'shirwinprince',
    role: 'Midnight Coder',
    repos: '..',
    followers: '..',
    commits: 1247, 
    joined: '2021',
    link: 'https://github.com/shirwinprince',
  })

  const [leetcode, setLeetcode] = useState({
    username: leetcodeUsername,
    rank: 'Loading..',
    solved: { total: 41, max: 3300 },
    easy: { done: 29, total: 820 },
    medium: { done: 10, total: 1700 },
    hard: { done: 2, total: 750 },
    link: leetcodeProfileUrl,
  })

  useEffect(() => {
    let isMounted = true

    // 1. Fetch GitHub
    fetch('https://api.github.com/users/shirwinprince')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        if (!isMounted || !data) return

        setGithub((prev) => ({
          ...prev,
          repos: data.public_repos,
          followers: data.followers,
          joined: data.created_at ? new Date(data.created_at).getFullYear().toString() : prev.joined,
        }))
      })
      .catch(() => {
        // Keep fallback values when API is unavailable.
      })

    // 2. Fetch LeetCode only when a stats API is configured.
    const leetcodeStatsUrl = buildLeetcodeStatsUrl(leetcodeUsername)
    if (!leetcodeStatsUrl) {
      setLeetcode((prev) => ({
        ...prev,
        rank: 'Unavailable',
      }))

      return () => {
        isMounted = false
      }
    }

    fetch(leetcodeStatsUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`LeetCode API error: ${res.status}`)
        }

        const contentType = res.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          throw new Error('LeetCode API did not return JSON')
        }

        return res.json()
      })
      .then((data) => {
        if (!isMounted || !data) return

        setLeetcode((prev) => ({
          ...prev,
          rank: data.ranking ? `#${data.ranking}` : prev.rank,
          solved: { total: data.totalSolved ?? prev.solved.total, max: data.totalQuestions ?? prev.solved.max },
          easy: { done: data.easySolved ?? prev.easy.done, total: data.totalEasy ?? prev.easy.total },
          medium: { done: data.mediumSolved ?? prev.medium.done, total: data.totalMedium ?? prev.medium.total },
          hard: { done: data.hardSolved ?? prev.hard.done, total: data.totalHard ?? prev.hard.total },
        }))
      })
      .catch(() => {
        if (!isMounted) return

        setLeetcode((prev) => ({
          ...prev,
          rank: 'Unavailable',
        }))
      })

    return () => {
      isMounted = false
    }
  }, [leetcodeUsername])

  return (
    <section id="coding-stats" className="relative py-24 lg:py-32 bg-[#0a0a0a] tech-grid-bg">
      <div className="container-main relative z-10" ref={ref}>
        
        <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="flex items-end justify-between mb-3">
          <h2 className="font-mono text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-none">
            CODING<span className="text-[#00ff66]">_</span>STATS
          </h2>
          <span className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#00ff66]">
            <span className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse" />
            LIVE_SYNC
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="h-[1px] bg-[#00ff6625] mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-[#1a1a1a]">
          {/* GITHUB PANEL */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="bg-[#0d0d0d] p-6 sm:p-8 border border-[#1f1f1f] flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-[#00ff66]">
                <GithubIcon />
                <span className="font-mono text-sm font-bold tracking-wider">GITHUB</span>
              </div>
              <span className="font-mono text-[10px] text-[#555]">{'/// PANEL_01'}</span>
            </div>
            <div className="mb-5">
              <span className="font-mono text-[11px] text-[#555]">{'>'} user</span>
              <p className="font-mono text-xl font-bold text-white mt-1">@{github.username}</p>
              <span className="inline-block font-mono text-[10px] text-[#00ff66] border border-[#00ff6640] px-2 py-0.5 mt-2">{github.role}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-[#1a1a1a] mb-6">
              <StatBox label="Repos" value={github.repos} />
              <StatBox label="Followers" value={github.followers} />
              <StatBox label="Commits" value={github.commits} />
              <StatBox label="Joined" value={github.joined} />
            </div>
            <div className="mb-6">
              <span className="block font-mono text-[9px] text-[#555] uppercase mb-2">CONTRIBUTIONS</span>
              <HeatmapGrid cols={22} accent="#00ff66" />
            </div>
            <div className="mt-auto pt-4 border-t border-[#1f1f1f]">
              <a href={github.link} target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] font-bold text-[#00ff66] hover:text-white transition-colors">{'[ VIEW_GH → ]'}</a>
            </div>
          </motion.div>

          {/* LEETCODE PANEL */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="bg-[#0d0d0d] p-6 sm:p-8 border border-[#1f1f1f] flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-[#ffa116]">
                <LeetcodeIcon />
                <span className="font-mono text-sm font-bold tracking-wider">LEETCODE</span>
              </div>
              <span className="font-mono text-[10px] text-[#555]">{'/// PANEL_02'}</span>
            </div>
            <div className="mb-5">
              <span className="font-mono text-[11px] text-[#555]">{'>'} user</span>
              <p className="font-mono text-xl font-bold text-white mt-1">@{leetcode.username}</p>
              <span className="inline-block font-mono text-[10px] text-[#ffa116] border border-[#ffa11640] px-2 py-0.5 mt-2 uppercase tracking-tighter">{leetcode.rank}</span>
            </div>
            <div className="flex items-start gap-6 mb-6">
              <ProgressRing done={leetcode.solved.total} max={leetcode.solved.max} />
              <div className="flex-1 space-y-3 pt-1">
                <DifficultyBar label="Easy" done={leetcode.easy.done} total={leetcode.easy.total} color="#00b8a3" />
                <DifficultyBar label="Medium" done={leetcode.medium.done} total={leetcode.medium.total} color="#ffa116" />
                <DifficultyBar label="Hard" done={leetcode.hard.done} total={leetcode.hard.total} color="#ef4743" />
              </div>
            </div>
            <div className="mb-6">
              <span className="block font-mono text-[9px] text-[#555] uppercase mb-2">ACTIVITY</span>
              <HeatmapGrid cols={22} accent="#ffa116" />
            </div>
            <div className="mt-auto pt-4 border-t border-[#1f1f1f]">
              <a href={leetcode.link} target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] font-bold text-[#ffa116] hover:text-white transition-colors">{'[ VIEW_LC → ]'}</a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="flex items-center justify-between px-1 py-3 text-[#555] font-mono text-[11px]">
          <span>ACTIVE_PANELS: 2</span>
          <span>SYNC: OK</span>
        </motion.div>
      </div>
    </section>
  )
}