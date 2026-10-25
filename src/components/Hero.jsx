import { motion } from 'framer-motion'
import profile from '../data/profile.json'
import KpiCounters from './KpiCounters'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const initials = profile.name.split(' ').map((p) => p[0]).join('').slice(0, 2)

  return (
    <section id="top">
      <div className="wrap pb-20 pt-36 text-center sm:pt-44">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease }} className="mx-auto mb-8 h-24 w-24">
          {profile.headshot ? (
            <img src={profile.headshot} alt={profile.name} className="h-24 w-24 rounded-full object-cover" />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface text-3xl font-semibold text-ink">{initials}</div>
          )}
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="text-[17px] font-semibold text-muted sm:text-[21px]">
          {profile.title}
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }} className="mx-auto mt-2 max-w-4xl text-[48px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[80px]">
          {profile.headline}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease }} className="lead mx-auto mt-6 max-w-2xl">
          {profile.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.4 }} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a href="#projects" className="pill">See my work</a>
          <a href={profile.resume} download className="link">Download resume ›</a>
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
