import achievements from '../data/achievements.json'
import Reveal from './Reveal'

export default function Achievements() {
  return (
    <section id="impact" className="section">
      <div className="wrap">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Selected impact</p>
          <h2 className="headline mt-3">Results from my work. <span>Data models, dashboards, automation.</span></h2>
          <p className="lead mt-5 max-w-2xl">Examples of results from data modeling, report tuning, and workflow automation.</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <Reveal key={achievement.label} delay={index * 0.04} className="card p-6 sm:p-7">
              <p className="text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">{achievement.value}</p>
              <h3 className="mt-3 text-base font-semibold text-ink">{achievement.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{achievement.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
