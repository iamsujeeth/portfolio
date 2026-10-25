import { useEffect, useState } from 'react'
import { Braces, ChartNoAxesCombined, Cloud, Database, GitBranch, Layers, ShieldCheck } from 'lucide-react'
import skills from '../data/skills.json'
import Reveal from './Reveal'

const iconByName = {
  code: Braces,
  pipeline: GitBranch,
  model: Layers,
  cloud: Cloud,
  chart: ChartNoAxesCombined,
  quality: ShieldCheck,
}

const nodePositions = [
  { left: '17%', top: '18%' },
  { left: '50%', top: '9%' },
  { left: '83%', top: '18%' },
  { left: '83%', top: '82%' },
  { left: '50%', top: '91%' },
  { left: '17%', top: '82%' },
]

export default function Skills() {
  const [activeId, setActiveId] = useState(skills.web[0].id)
  const [mobile, setMobile] = useState(() => window.innerWidth < 640)
  const active = skills.web.find((category) => category.id === activeId) ?? skills.web[0]

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <Reveal>
          <h2 className="headline">Skills. <span>Select an area to explore.</span></h2>
          <p className="lead mt-5 max-w-2xl">The tools and methods I use across the data lifecycle.</p>
        </Reveal>

        <Reveal className="glass-panel card mt-10 overflow-hidden p-5 sm:p-8">
          <div
            className="skill-web relative mx-auto h-[340px] max-w-[820px]"
            style={mobile ? { display: 'grid', height: 'auto', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' } : undefined}
          >
            <svg className="skill-web-lines pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 820 340" preserveAspectRatio="none" aria-hidden="true">
              {nodePositions.map((position) => (
                <line
                  key={`${position.left}-${position.top}`}
                  x1="410"
                  y1="170"
                  x2={Number.parseFloat(position.left) * 8.2}
                  y2={Number.parseFloat(position.top) * 3.4}
                  className="stroke-line"
                  strokeWidth="1.5"
                />
              ))}
            </svg>

            <div hidden={mobile} className="skill-web-hub absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-line bg-surface text-center shadow-sm">
                <Database className="h-5 w-5 text-ink" aria-hidden="true" />
                <span className="mt-1 text-[10px] font-semibold text-ink">DATA</span>
              </div>
            </div>

            {skills.web.map((category, index) => {
              const Icon = iconByName[category.icon]
              const position = nodePositions[index]

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveId(category.id)}
                  aria-pressed={activeId === category.id}
                  className={`skill-web-node glass-panel interactive-surface z-20 flex items-center gap-2 rounded-xl border px-3 py-2 text-left shadow-sm transition sm:gap-3 sm:px-4 sm:py-3 ${
                    activeId === category.id
                      ? 'border-accent bg-card ring-1 ring-accent'
                      : 'border-line bg-card hover:bg-surface'
                  }`}
                  style={mobile
                    ? { position: 'static', transform: 'none', width: '100%' }
                    : { left: position.left, top: position.top }}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${activeId === category.id ? 'bg-accent-fill text-white' : 'bg-surface text-ink'}`}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold leading-tight text-ink sm:text-sm">{category.name}</span>
                </button>
              )
            })}
          </div>

          <div className="border-t border-line pt-5" aria-live="polite">
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = iconByName[active.icon]
                return <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
              })()}
              <h3 className="text-sm font-semibold text-ink">{active.name}</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {active.items.map((item) => (
                <span key={item} className="rounded-md bg-surface px-2.5 py-1.5 text-xs font-medium text-ink">{item}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
