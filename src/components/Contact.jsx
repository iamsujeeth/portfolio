import profile from '../data/profile.json'
import Reveal from './Reveal'

export default function Contact() {
  const social = [
    { label: 'LinkedIn', href: profile.links.linkedin, mark: 'in' },
    { label: 'GitHub', href: profile.links.github, mark: 'github' },
  ]

  return (
    <section id="contact" className="bg-surface">
      <div className="wrap py-32 text-center sm:py-40">
        <Reveal>
          <h2 className="text-[48px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[72px]">Let’s connect.</h2>
          <p className="lead mx-auto mt-5 max-w-xl">Open to senior data and analytics engineering roles.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a href={`mailto:${profile.email}`} className="pill">Get in touch</a>
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-line">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted sm:flex-row">
          <p>Copyright © {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            {social.map(({ label, href, mark }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-2 text-sm font-medium text-ink transition hover:bg-surface">
                {mark === 'github' ? (
                  <svg className="h-5 w-5 text-ink" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.69-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.64 1.22 3.28.93.1-.72.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.75 10.75 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.62 1.55.23 2.7.12 2.98.72.79 1.15 1.8 1.15 3.03 0 4.32-2.63 5.27-5.14 5.55.4.34.76 1.04.76 2.1v3.09c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
                  </svg>
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-surface text-[11px] font-bold text-ink" aria-hidden="true">
                    {mark}
                  </span>
                )}
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  )
}
