import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - window.innerHeight
        const progress = range > 0 ? Math.min(window.scrollY / range, 1) : 0
        ref.current?.style.setProperty('--scroll-progress', String(progress))
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="scroll-progress"
    />
  )
}
