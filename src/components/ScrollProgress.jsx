import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-amber-400 z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
