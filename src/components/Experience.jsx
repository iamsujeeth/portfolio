import data from '../data/experience.json'
import Reveal from './Reveal'

export default function Experience() {
  return (
    <section id="experience" className="section bg-surface">
      <div className="wrap">
        <Reveal>
          <h2 className="headline">Experience. <span>Where I've done it.</span></h2>
        </Reveal>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {data.jobs.map((job, i) => (
            <Reveal key={job.role + job.company} delay={i * 0.05}>
              <div className="grid gap-4 py-10 md:grid-cols-[260px_1fr]">
                <div>
                  <p className="text-[15px] text-muted">{job.dates}</p>
                  <p className="mt-1 text-[15px] text-muted">{job.location}</p>
                </div>
                <div>
                  <h3 className="text-[24px] font-semibold tracking-tight text-ink">{job.role}</h3>
                  <p className="text-[17px] text-muted">{job.company}</p>
                  <ul className="mt-5 space-y-2.5">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[17px] leading-relaxed text-ink">
                        <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-muted" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
