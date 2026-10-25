import { useEffect, useState } from 'react'
import { BarChart3, Database, Layers3, WandSparkles } from 'lucide-react'

const chapters = [
  { id: 'top', story: 'Start with a question worth answering.' },
  { id: 'impact', story: 'Make the result clear, measurable, and useful.' },
  { id: 'approach', story: 'Follow the data from its source to an answer.' },
  { id: 'skills', story: 'Pick the right tool for every step.' },
  { id: 'experience', story: 'Build dependable data work, one decision at a time.' },
  { id: 'education', story: 'Give good analysis a strong foundation.' },
  { id: 'credentials', story: 'Keep learning as the tools and questions evolve.' },
  { id: 'contact', story: 'Then use what you learned to ask a better question.' },
]

const pipeline = [
  { label: 'Collect', detail: 'Find the signal', Icon: Database },
  { label: 'Prepare', detail: 'Make it reliable', Icon: WandSparkles },
  { label: 'Model', detail: 'Give it structure', Icon: Layers3 },
  { label: 'Explain', detail: 'Show what matters', Icon: BarChart3 },
]

const route = [
  { x: 18, y: 26 },
  { x: 18, y: 78 },
  { x: 18, y: 130 },
  { x: 18, y: 182 },
]
const controls = [
  [{ x: 50, y: 37 }, { x: 50, y: 67 }],
  [{ x: -14, y: 89 }, { x: -14, y: 119 }],
  [{ x: 50, y: 141 }, { x: 50, y: 171 }],
]

function pointOnRoute(progress) {
  const segment = Math.min(Math.floor(progress * (route.length - 1)), route.length - 2)
  const t = progress === 1 ? 1 : progress * (route.length - 1) - segment
  const [start, end] = [route[segment], route[segment + 1]]
  const [first, second] = controls[segment]
  const inverse = 1 - t
  return {
    x: inverse ** 3 * start.x + 3 * inverse ** 2 * t * first.x + 3 * inverse * t ** 2 * second.x + t ** 3 * end.x,
    y: inverse ** 3 * start.y + 3 * inverse ** 2 * t * first.y + 3 * inverse * t ** 2 * second.y + t ** 3 * end.y,
  }
}

export default function StoryRail() {
  const [activeIndex, setActiveIndex] = useState(0)
  const progress = activeIndex / (chapters.length - 1)
  const packet = pointOnRoute(progress)
  const activeStage = Math.min(Math.floor(progress * pipeline.length), pipeline.length - 1)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.4
        let current = 0
        chapters.forEach((chapter, index) => {
          const section = document.getElementById(chapter.id)
          if (section && section.getBoundingClientRect().top <= marker) current = index
        })
        setActiveIndex(current)
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

  const activeChapter = chapters[activeIndex]

  return (
    <aside className="story-rail glass-panel" aria-label="Portfolio story">
      <div className="story-rail-heading">
        <span className="story-rail-spark" aria-hidden="true">✳</span>
        <p className="story-rail-eyebrow">The data journey</p>
      </div>
      <svg className="story-pipeline" viewBox="0 0 58 208" role="img" aria-label="A data pipeline from collection through preparation and modeling to insights">
        <path d="M18 26 C50 37 50 67 18 78 C-14 89 -14 119 18 130 C50 141 50 171 18 182" className="story-pipeline-track" />
        <path d="M18 26 C50 37 50 67 18 78 C-14 89 -14 119 18 130 C50 141 50 171 18 182" className="story-pipeline-flow" pathLength="100" style={{ strokeDasharray: `${progress * 100} 100` }} />
        <circle cx={packet.x} cy={packet.y} r="5" className="story-pipeline-packet" />
        <circle cx={packet.x} cy={packet.y} r="9" className="story-pipeline-packet-glow" />
      </svg>
      <ol className="story-pipeline-stages">
        {pipeline.map(({ label, detail, Icon }, index) => (
          <li key={label} className={`story-pipeline-stage ${index <= activeStage ? 'is-passed' : ''} ${index === activeStage ? 'is-current' : ''}`}>
            <span className="story-pipeline-icon"><Icon aria-hidden="true" /></span>
            <span className="story-pipeline-copy">
              <span className="story-pipeline-label">{label}</span>
              <span className="story-pipeline-detail">{detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="story-rail-footer" aria-live="polite">
        <span className="story-rail-step">0{activeIndex + 1} <span>/ 0{chapters.length}</span></span>
        <p className="story-rail-summary">{activeChapter.story}</p>
      </div>
    </aside>
  )
}
