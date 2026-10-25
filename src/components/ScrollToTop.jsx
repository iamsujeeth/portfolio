import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'

export default function ScrollToTop() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setVisible(window.scrollY > 700))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
      className={`glass-control interactive-surface fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full text-ink shadow-lg sm:bottom-8 sm:right-8 ${visible ? 'scroll-top-visible' : 'scroll-top-hidden'}`}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}
