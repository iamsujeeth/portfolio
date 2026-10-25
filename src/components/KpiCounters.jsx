import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setDisplay(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value])

  return <span ref={ref}>{display}{suffix}</span>
}

export default function KpiCounters({ kpis }) {
  return (
    <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
      {kpis.map((k) => (
        <div key={k.label} className="text-center">
          <div className="text-[44px] font-semibold tracking-[-0.03em] text-ink sm:text-[56px]">
            <Counter value={k.value} suffix={k.suffix} />
          </div>
          <div className="mt-1 text-[15px] text-muted">{k.label}</div>
        </div>
      ))}
    </div>
  )
}
