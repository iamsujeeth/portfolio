import profile from '../data/profile.json'
import Reveal from './Reveal'

export default function Contact() {
  const social = [
    { label: 'LinkedIn', href: profile.links.linkedin },
    { label: 'GitHub', href: profile.links.github },
    { label: 'Tableau Public', href: profile.links.tableau },
  ]

  return (
    <section id="contact" className="bg-surface">
      <div className="wrap py-32 text-center sm:py-40">
        <Reveal>
          <h2 className="text-[48px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[72px]">Let's build something.</h2>
          <p className="lead mx-auto mt-5 max-w-xl">Open to senior data and analytics engineering roles.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a href={`mailto:${profile.email}`} className="pill">Get in touch</a>
            <a href={profile.resume} download className="link">Download resume ›</a>
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-line">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted sm:flex-row">
          <p>Copyright © {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex gap-6">
            {social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-ink hover:underline">{s.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  )
}
