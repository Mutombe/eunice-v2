import { useRef, useEffect, useState } from 'react'

// Drawing hairline that stretches across the page on scroll-into-view
export default function HairlineDivider({ label = '', num = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.5 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="container-edge py-12 md:py-20 relative">
      <div className="grid grid-cols-12 items-center gap-4">
        <span className="col-span-2 mono text-ink/55 tabular">{num}</span>
        <div className="col-span-10 relative">
          <svg viewBox="0 0 1200 1" preserveAspectRatio="none" className="w-full h-px">
            <line x1="0" y1="0.5" x2="1200" y2="0.5"
              stroke="rgba(26,26,25,0.35)" strokeWidth="1"
              strokeDasharray="1200" strokeDashoffset={visible ? 0 : 1200}
              style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.65,0,0.35,1)' }}
            />
          </svg>
          {label && (
            <span className={`absolute right-0 -top-3 bg-paper px-3 mono text-ink/55 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.8s' }}>
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
