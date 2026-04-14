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

function App() {
  return (
    <div className="relative min-h-screen bg-cream grid-bg">
      <CustomCursor />
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
