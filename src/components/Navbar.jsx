import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: '/ABOUT', href: '#about' },
  { name: '/SKILLS', href: '#skills' },
  { name: '/LOGS', href: '#experience' },
  { name: '/WORK', href: '#projects' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FDFDF5] border-b-[3px] border-black'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="relative font-mono font-black text-base tracking-tight border-[3px] border-black px-3 py-1 bg-[#F4FF3A] text-black hover:translate-x-[1px] hover:translate-y-[1px] transition-transform duration-150"
              style={{ boxShadow: '4px 4px 0 0 #000' }}
            >
              SHIRWIN<span className="text-black/50">.exe</span>
            </a>

            {/* Desktop Links — boxed container */}
            <div className="hidden md:flex items-center gap-0 border-[3px] border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="px-4 py-2 font-mono text-[13px] font-bold text-black/60 hover:text-black hover:bg-[#F4FF3A] border-r-[2px] border-black last:border-r-0 transition-all duration-150"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                className="relative ml-3 px-5 py-2 font-mono text-[13px] font-black text-black border-[3px] border-black bg-[#F4FF3A] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform duration-150 uppercase"
                style={{ boxShadow: '4px 4px 0 0 #000' }}
              >
                HIRE ME
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-[5px] p-2"
              aria-label="Menu"
            >
              <span className={`block w-5 h-[2px] bg-black transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-5 h-[2px] bg-black transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[2px] bg-black transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FDFDF5] border-b-[3px] border-black overflow-hidden"
            >
              <div className="px-5 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="block px-3 py-3 font-mono text-[13px] font-bold text-black/60 hover:text-black hover:bg-[#F4FF3A] transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => scrollTo(e, '#contact')}
                  className="block mt-3 px-3 py-3 font-mono text-[13px] font-black border-[3px] border-black text-black text-center bg-[#F4FF3A] hover:bg-black hover:text-white transition-all"
                >
                  HIRE ME
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Top-right status pill */}
      <div
        className="fixed top-2 right-3 z-50 hidden lg:flex items-center gap-2 font-mono text-[10px] text-black font-black border-[3px] border-black px-2.5 py-1 bg-black"
      >
        <span className="w-2 h-2 bg-[#22C55E] animate-pulse" />
        <span className="text-white tracking-wider">Freelance</span>
      </div>
    </>
  )
}
