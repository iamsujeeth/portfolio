import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

function Block({ label, children }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 text-[17px] leading-relaxed text-ink">{children}</p>
    </div>
  )
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = project ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-card p-8 sm:rounded-[28px] sm:p-14"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink hover:bg-line/60">
              <X className="h-4 w-4" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-wider text-muted">{project.categories.join(' · ')}</p>
            <h3 className="mt-3 pr-10 text-[34px] font-semibold leading-tight tracking-tight text-ink sm:text-[44px]">{project.title}</h3>

            {project.metric && (
              <p className="mt-4 text-[21px] text-muted"><span className="font-semibold text-ink">{project.metric.value}</span> {project.metric.label}</p>
            )}

            {project.image && <img src={project.image} alt={project.title} className="mt-8 w-full rounded-2xl" />}

            <div className="mt-10 space-y-8">
              <Block label="The problem">{project.problem}</Block>
              <Block label="What I built">{project.built}</Block>
              <Block label="The impact">{project.impact}</Block>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {project.stack.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>

            {(project.github || project.demo) && (
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="pill">View live</a>}
                {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="link">See the code ›</a>}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
