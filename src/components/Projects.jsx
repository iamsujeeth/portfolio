import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import projects from '../data/projects.json'
import Reveal from './Reveal'
import ProjectModal from './ProjectModal'

// Lines the first card up with the page content, on any screen width
const gutter = 'max(20px, calc((100vw - 1120px) / 2 + 32px))'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const rail = useRef(null)

  const categories = useMemo(() => ['All', ...new Set(projects.flatMap((p) => p.categories))], [])
  const visible = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))

  const scroll = (dir) => rail.current?.scrollBy({ left: dir * 380, behavior: 'smooth' })

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <Reveal>
          <h2 className="headline">Work. <span>Projects that shipped and stuck.</span></h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setFilter(c); rail.current?.scrollTo({ left: 0 }) }}
              className={`rounded-full px-4 py-2 text-sm transition ${filter === c ? 'bg-ink text-canvas' : 'bg-surface text-ink hover:bg-line/60'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal card rail, like the Apple Store "The latest" row */}
      <div
        ref={rail}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-8 pt-2"
        style={{ paddingLeft: gutter, scrollPaddingLeft: gutter }}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.button
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(p)}
              className="card card-hover flex h-[440px] w-[310px] shrink-0 snap-start flex-col p-8 text-left sm:w-[360px]"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{p.categories.join(' · ')}</p>
              <h3 className="mt-3 text-[26px] font-semibold leading-tight tracking-tight text-ink">{p.title}</h3>
              <p className="mt-3 text-[17px] leading-snug text-muted">{p.summary}</p>

              <div className="mt-auto">
                {p.metric && (
                  <>
                    <div className="text-[40px] font-semibold tracking-[-0.03em] text-ink">{p.metric.value}</div>
                    <div className="text-sm text-muted">{p.metric.label}</div>
                  </>
                )}
                <span className="mt-5 inline-block text-[17px] text-accent">Learn more ›</span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
        <div className="w-5 shrink-0 sm:w-8" />
      </div>

      <div className="wrap flex justify-end gap-3">
        <button onClick={() => scroll(-1)} aria-label="Previous" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink transition hover:bg-line/60"><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={() => scroll(1)} aria-label="Next" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink transition hover:bg-line/60"><ChevronRight className="h-5 w-5" /></button>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
