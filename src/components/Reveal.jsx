import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
