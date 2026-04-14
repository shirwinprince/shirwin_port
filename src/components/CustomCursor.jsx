import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Cursor states: 'default' | 'view' | 'input'
export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default')
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Smooth spring for trailing sword
  const springConfig = { damping: 22, stiffness: 260, mass: 0.4 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const handleEnter = () => setVisible(true)
    const handleLeave = () => setVisible(false)
    const handleDown = () => setClicking(true)
    const handleUp = () => setClicking(false)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleEnter)
    document.addEventListener('mouseleave', handleLeave)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleEnter)
      document.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [cursorX, cursorY, visible])

  // Listen for custom cursor-state events
  useEffect(() => {
    const handleCursorChange = (e) => setCursorState(e.detail || 'default')
    window.addEventListener('cursor-state', handleCursorChange)
    return () => window.removeEventListener('cursor-state', handleCursorChange)
  }, [])

  // Handle data-cursor attributes
  useEffect(() => {
    const handleOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) setCursorState(target.getAttribute('data-cursor'))
    }
    const handleOut = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) setCursorState('default')
    }
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    return () => {
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [])

  const isView = cursorState === 'view'
  const isInput = cursorState === 'input'

  return (
    <>
      {/* Sword cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.85 : isView ? 1.15 : 1,
            rotate: clicking ? -15 : isView ? 10 : 0,
          }}
          transition={{ type: 'spring', damping: 18, stiffness: 280 }}
          style={{
            // Offset so the sword tip aligns with the actual cursor point
            transform: 'translate(-8px, -8px)',
          }}
        >
          <img
            src="/cursor-sword.gif"
            alt=""
            className="w-8 h-8 select-none"
            draggable={false}
            style={{
              filter: isView
                ? 'drop-shadow(0 0 8px rgba(244,255,58,0.8)) drop-shadow(0 0 16px rgba(244,255,58,0.4))'
                : isInput
                ? 'drop-shadow(0 0 6px rgba(59,130,246,0.7))'
                : 'drop-shadow(0 0 4px rgba(0,0,0,0.4))',
              imageRendering: 'auto',
            }}
          />
          {/* VIEW label when hovering project cards */}
          {isView && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] font-black text-black bg-[#F4FF3A] px-1.5 py-0.5 border border-black tracking-widest whitespace-nowrap"
            >
              VIEW
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
