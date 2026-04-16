import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import CodingStats from './components/CodingStats'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import { useEffect, useState } from 'react'

function App() {
  const [showCustomCursor, setShowCustomCursor] = useState(false)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateCursorVisibility = () => setShowCustomCursor(desktopQuery.matches)

    updateCursorVisibility()
    desktopQuery.addEventListener('change', updateCursorVisibility)

    return () => desktopQuery.removeEventListener('change', updateCursorVisibility)
  }, [])

  return (
    <div className="relative min-h-screen bg-cream grid-bg">
      {showCustomCursor && <CustomCursor />}
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <CodingStats />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
