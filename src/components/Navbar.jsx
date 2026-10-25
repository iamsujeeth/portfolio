import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import profile from '../data/profile.json'

const links = [
  { href: '#projects', label: 'Work' },
  { href: '#pipeline', label: 'Architecture' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch (e) { /* storage blocked */ }
  }, [dark])

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl backdrop-saturate-150" style={{ background: 'var(--nav)' }}>
      <nav className="wrap flex h-12 items-center justify-between">
        <a href="#top" className="text-[15px] font-semibold tracking-tight text-ink">{profile.name}</a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-xs text-ink/80 transition hover:text-ink">{l.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-full p-1.5 text-ink/80 transition hover:text-ink"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href={profile.resume} download className="pill-sm hidden sm:inline-flex">Resume</a>
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
          <a href={profile.resume} download className="link mt-4">Download resume ›</a>
        </div>
      )}
    </header>
  )
}
