import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import profile from '../data/profile.json'

const links = [
  { href: '#impact', label: 'Impact' },
  { href: '#approach', label: 'Approach' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Background' },
  { href: '#education', label: 'Education' },
  { href: '#credentials', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const [open, setOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch (e) { /* storage blocked */ }
  }, [dark])

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const active = sections
          .filter((section) => section.getBoundingClientRect().top <= window.innerHeight * 0.3)
          .at(-1)
        setActiveLink(active ? `#${active.id}` : '')
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

  return (
    <header className="glass-nav fixed inset-x-0 top-0 z-50">
      <nav className="wrap flex h-12 items-center justify-between">
        <a href="#top" className="text-[15px] font-semibold tracking-tight text-ink">{profile.name}</a>

        <div className="no-scrollbar hidden max-w-[72vw] items-center gap-1 overflow-x-auto md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={activeLink === l.href ? 'location' : undefined}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition ${
                activeLink === l.href ? 'bg-surface font-semibold text-ink' : 'text-muted hover:bg-surface/70 hover:text-ink'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="glass-control rounded-full p-2 text-ink/80 transition hover:text-ink"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="p-1 text-ink md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="wrap pb-6 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-line py-3 text-[17px] font-semibold text-ink">{l.label}</a>
          ))}
        </div>
      )}
    </header>
  )
}
