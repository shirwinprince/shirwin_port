const siteLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Works', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:shirwinprince@gmail.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault()
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      className="relative z-10 border-t-[4px] border-black bg-[#FDFDF5]"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="container-main py-16">
        <div className="grid sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-mono text-2xl font-black text-black mb-3">
              SHIRWIN<span className="inline-block bg-[#F4FF3A] border-[2px] border-black px-1">.</span>
            </h3>
            <p className="font-mono text-[13px] text-black/60 leading-[1.7]">
              Building machine learning systems that turn data into decisions.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="font-mono text-[11px] text-black/40 uppercase tracking-widest mb-4 font-black">SITEMAP</h4>
            <ul className="space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="font-mono text-[13px] text-black/60 hover:text-black hover:bg-[#F4FF3A] px-1 transition-colors duration-150 font-bold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-mono text-[11px] text-black/40 uppercase tracking-widest mb-4 font-black">SOCIALS</h4>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center border-[3px] border-black text-black bg-white hover:bg-[#F4FF3A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150"
                  style={{ boxShadow: '3px 3px 0 0 #000' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t-[3px] border-black flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-black/50 font-bold">
            &copy; 2026 SHIRWIN.exe // SYSTEM_END
          </span>
          <span
            className="font-mono text-[10px] text-black font-black border-[3px] border-black px-2.5 py-0.5 bg-[#F4FF3A]"
            style={{ transform: 'rotate(-2deg)', boxShadow: '3px 3px 0 0 #000' }}
          >
            BRUTAL
          </span>
        </div>
      </div>
    </footer>
  )
}
