import data from '../data/experience.json'
import Reveal from './Reveal'

function Tile({ eyebrow, title, sub, url, delay }) {
  const inner = (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{eyebrow}</p>
      <h3 className="mt-3 text-[21px] font-semibold leading-snug tracking-tight text-ink">{title}</h3>
      <p className="mt-1 text-[15px] text-muted">{sub}</p>
      {url && <span className="mt-4 inline-block text-[15px] text-accent">Verify ›</span>}
    </>
  )
  return (
    <Reveal delay={delay}>
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="card card-hover block h-full p-7">{inner}</a>
      ) : (
        <div className="card h-full p-7">{inner}</div>
      )}
    </Reveal>
  )
}

export default function Certifications() {
  return (
    <>
      <section id="education" className="section bg-surface">
        <div className="wrap">
          <Reveal>
            <h2 className="headline">Education. <span>Where my technical foundation began.</span></h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {data.education.map((item) => (
              <article key={item.degree} className="card p-6 sm:p-7">
                <p className="text-sm font-medium text-muted">{item.year}</p>
                <h3 className="mt-3 text-xl font-semibold leading-snug text-ink">{item.degree}</h3>
                <p className="mt-2 text-muted">{item.school}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="credentials" className="section">
      <div className="wrap">
        <Reveal>
          <h2 className="headline">Certifications. <span>Continuing to build expertise.</span></h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.certifications.map((c, i) => (
            <Tile key={c.name} eyebrow="Certification" title={c.name} sub={c.issuer} url={c.url} delay={i * 0.05} />
          ))}
        </div>
      </div>
      </section>
    </>
  )
}
