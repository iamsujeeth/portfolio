import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import data from '../data/experience.json'
import Reveal from './Reveal'

export default function Experience() {
  const [expandedJob, setExpandedJob] = useState(null)

  return (
    <section id="experience" className="section bg-surface">
      <div className="wrap">
        <Reveal>
          <h2 className="headline">Background. <span>A career built over time.</span></h2>
        </Reveal>

        <ol className="relative mt-12 space-y-4 before:absolute before:bottom-8 before:left-[11px] before:top-8 before:w-px before:bg-line sm:space-y-5">
          {data.jobs.map((job, index) => (
            <Reveal key={job.role + job.company} delay={index * 0.05}>
              <li className={`experience-item relative pl-9 ${job.dates.toLowerCase().includes('present') ? 'experience-item-current' : ''}`}>
                <span className="experience-marker absolute left-1 top-7 h-4 w-4 rounded-full border-[3px] border-accent bg-canvas" aria-hidden="true" />
                <div className="card experience-card p-4 sm:p-6">
                  <div>
                    <button
                      type="button"
                      aria-expanded={expandedJob === index}
                      aria-controls={`job-description-${index}`}
                      onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                      className="group flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-left text-base font-semibold text-ink sm:text-lg">{job.role}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-muted transition-transform ${expandedJob === index ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    <p className="mt-1 text-muted">{job.company} <span aria-hidden="true">·</span> {job.location}</p>
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted">{job.dates}</p>
                  <p
                    id={`job-description-${index}`}
                    hidden={expandedJob !== index}
                    className="mt-4 max-w-3xl border-t border-line pt-4 text-sm leading-relaxed text-muted sm:text-base"
                  >
                    {job.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
