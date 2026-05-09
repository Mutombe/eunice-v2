import { useState, useEffect } from 'react'

export default function GridOverlay() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'g' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setShow((s) => !s)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  if (!show) return null
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div className="container-edge h-full">
        <div className="grid-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-clay-400/10 h-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
