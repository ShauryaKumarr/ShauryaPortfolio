import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import Terminal from '../components/Terminal'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'

const roles = ['developer', 'researcher', 'problem solver', 'visionary']

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'SQL', 'R'],
  },
  {
    title: 'Frameworks & Tools',
    skills: ['TensorFlow', 'PyTorch', 'React', 'Node.js', 'Express.js', 'FastAPI', 'LangChain', 'Pandas', 'NumPy', 'scikit-learn', 'Docker', 'AWS', 'Git', 'Jupyter'],
  },
  {
    title: 'Areas of Interest',
    skills: ['AI/ML', 'LLMs & RAG', 'Computer Vision', 'Data Science', 'Quantum Computing', 'FinTech', 'Mathematics', 'Entrepreneurship'],
  },
]

const socials = [
  { icon: FaInstagram, href: 'https://www.instagram.com/shauryakumar._/', label: 'Instagram' },
  { icon: FaGithub, href: 'https://github.com/ShauryaKumarr', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/shauryak', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:shaurya@udel.edu', label: 'Email' },
]

const aboutParagraphs = [
  "I am currently a student at the University of Delaware, pursuing a double major in Computer Science and Applied Mathematics. I've worked as a researcher at Delaware State University and the University of Delaware, contributing to projects focused on AI/ML and data-driven problem-solving.",
  "My interests include artificial intelligence, machine learning, quantitative analysis, quantum computing, and entrepreneurship. I'm passionate about leveraging technology to solve real-world problems and create meaningful impact.",
  "I aim to drive innovation at the intersection of AI and real-world challenges. My ultimate goal is to pursue entrepreneurship — either by founding my own tech startup or joining an early-stage venture where I can make a significant impact and help transform innovative ideas into reality.",
]

/* Magnetic button — subtle pull toward cursor */
function MagneticButton({ children, className, to, href, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18 })
  const sy = useSpring(y, { stiffness: 180, damping: 18 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const Tag = to ? motion(Link) : motion.a
  const tagProps = to ? { to } : { href, ...(href?.startsWith('mailto') ? {} : { target: '_blank', rel: 'noreferrer' }) }

  return (
    <Tag
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      {...tagProps}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center px-6 pt-20 pb-10">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 lg:gap-10 items-center">

          {/* Left: text */}
          <div className="order-1">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-stone-500 text-xs tracking-[0.25em] uppercase mb-4 font-medium"
            >
              hey there, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.04] mb-6"
            >
              <span
                className="glitch text-stone-50"
                data-text="Shaurya Kumar."
              >
                Shaurya Kumar.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex items-center gap-2.5 text-lg md:text-xl text-stone-400 mb-10 h-8"
            >
              <span>I'm a</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.28 }}
                  className="text-amber-400 font-semibold min-w-[160px]"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <MagneticButton
                to="/projects"
                className="px-7 py-3 rounded-xl bg-amber-500 text-[#0b0a08] font-bold text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                View My Work
              </MagneticButton>
              <MagneticButton
                to="/resume"
                className="px-7 py-3 rounded-xl border border-[#272219] text-stone-400 font-semibold text-sm hover:border-amber-500/40 hover:text-stone-100 transition-all"
              >
                Resume
              </MagneticButton>
            </motion.div>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {[
                { label: '3+ Hackathon Wins' },
                { label: '2 Research Labs' },
                { label: 'DoD & NSF Funded' },
              ].map(({ label }) => (
                <span
                  key={label}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#272219] text-stone-500 bg-[#141210]/60"
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: terminal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="order-2 w-full"
          >
            <Terminal />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-stone-700 text-[10px] tracking-[0.3em] uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-stone-600 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── About ── */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SectionHead>About Me</SectionHead>
          </ScrollReveal>
          <div className="mt-10 bg-[#141210] border border-[#272219] rounded-2xl p-8 md:p-12 space-y-6">
            {aboutParagraphs.map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <p className="text-stone-300 text-lg leading-relaxed">{para}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="py-10 px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <SectionHead>Skills</SectionHead>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {skillCategories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 0.1}>
                <div className="bg-[#141210] border border-[#272219] rounded-2xl p-6 h-full hover:border-amber-500/20 transition-colors duration-300">
                  <h3 className="text-stone-100 font-semibold text-sm mb-4 tracking-wide">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs rounded-lg bg-[#0b0a08] text-stone-400 border border-[#272219] hover:border-amber-500/30 hover:text-stone-200 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Connect ── */}
      <section className="py-28 px-6">
        <div className="max-w-xl mx-auto text-center">
          <ScrollReveal>
            <SectionHead>Connect with Me</SectionHead>
            <p className="text-stone-600 text-xs tracking-[0.25em] uppercase mt-4 mb-10">
              currently based in Newark, Delaware
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center justify-center gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-[#141210] border border-[#272219] flex items-center justify-center text-stone-500 hover:text-amber-400 hover:border-amber-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  )
}

function SectionHead({ children }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-50">{children}</h2>
      <div className="mt-3 w-10 h-0.5 bg-amber-400 mx-auto rounded-full" />
    </div>
  )
}
