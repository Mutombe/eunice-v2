import { useRef, useEffect, useState } from 'react'

// Atelier signature: numbers count up to their target as they enter the viewport
export default function CountUp({ to, suffix = '', duration = 1400, className = '', formatter }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1)
          // Ease out cubic
          const eased = 1 - Math.pow(1 - t, 3)
          setVal(Math.round(eased * to))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to, duration])
  return (
    <span ref={ref} className={`tabular ${className}`}>
      {formatter ? formatter(val) : val}{suffix}
    </span>
  )
}
