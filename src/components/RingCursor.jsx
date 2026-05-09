import { useEffect, useRef, useState } from 'react'

// Atelier signature: a small ring that follows the cursor on the home page
// Disabled on touch devices automatically (no hover capability)
export default function RingCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`
      }
    }
    let raf
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.18
      cur.y += (target.y - cur.y) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate3d(${cur.x - 14}px, ${cur.y - 14}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    document.body.classList.add('ring-cursor')
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.body.classList.remove('ring-cursor')
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-clay-500 pointer-events-none z-[200] mix-blend-difference" />
      <div ref={ring} className="fixed top-0 left-0 w-[28px] h-[28px] rounded-full border border-ink-500/80 pointer-events-none z-[199] mix-blend-difference transition-[width,height] duration-300" />
    </>
  )
}
