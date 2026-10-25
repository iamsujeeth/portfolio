import { motion } from 'framer-motion'
import profile from '../data/profile.json'
import KpiCounters from './KpiCounters'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const initials = profile.name.split(' ').map((p) => p[0]).join('').slice(0, 2)

  return (
    <section id="top">
      <div className="wrap grid items-center gap-10 pb-20 pt-28 sm:pt-36 md:grid-cols-[1fr_260px] md:gap-16">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            {profile.title}
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }} className="mt-4 max-w-3xl text-[46px] font-semibold leading-[1.04] tracking-[-0.04em] text-ink sm:text-[68px]">
            {profile.headline}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease }} className="lead mt-6 max-w-xl">
            {profile.tagline}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.4 }} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#approach" className="pill">See how I work</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="order-first mx-auto aspect-[4/5] w-48 overflow-hidden rounded-2xl border border-line bg-surface md:order-last md:w-full">
          {profile.headshot ? (
            <img src={profile.headshot} alt={`${profile.name} portrait`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl font-semibold text-ink">{initials}</div>
          )}
        </motion.div>
      </div>

      <div className="bg-surface">
        <div className="wrap py-16">
          <KpiCounters kpis={profile.kpis} />
        </div>
      </div>
    </section>
  )
}
