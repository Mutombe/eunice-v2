/* Shared loading / error states for API-backed pages. */

export function Loading() {
  return (
    <div className="container-edge py-40 md:py-56 text-center">
      <span className="mono text-ink/55 tracking-[0.12em]">Loading…</span>
    </div>
  )
}

export function LoadError() {
  return (
    <div className="container-edge py-40 md:py-56 text-center">
      <p className="mono text-ink/55 tracking-[0.12em]">This page could not be loaded.</p>
      <p className="mt-3 text-sm text-ink/65">Please refresh, or try again shortly.</p>
    </div>
  )
}
