import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import ScrollReveal from '../components/ScrollReveal'
import {
  FaBrain, FaMicroscope, FaUsers, FaHeartbeat,
  FaComments, FaShieldAlt, FaLeaf,
  FaExternalLinkAlt, FaDownload, FaTimes, FaCalendarAlt, FaTags, FaGithub,
} from 'react-icons/fa'

const iconMap = { brain: FaBrain, microscope: FaMicroscope, users: FaUsers, heartpulse: FaHeartbeat, comments: FaComments, shield: FaShieldAlt, leaf: FaLeaf }

const categoryStyle = {
  research:  { icon: 'from-amber-500 to-orange-600',  badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  hackathon: { icon: 'from-stone-500 to-stone-700',   badge: 'bg-stone-500/10 text-stone-300 border-stone-500/20' },
  personal:  { icon: 'from-stone-600 to-stone-800',   badge: 'bg-stone-600/10 text-stone-400 border-stone-600/20' },
}

const filters = ['all', 'research', 'hackathon', 'personal']

/* 3D tilt card wrapper */
function TiltCard({ children, className, onClick }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({
    transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.4s ease',
  })
  const [glare, setGlare] = useState({ x: 50, y: 50, show: false })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setStyle({
      transform: `perspective(900px) rotateX(${(y - 0.5) * -13}deg) rotateY(${(x - 0.5) * 13}deg) scale(1.025)`,
      transition: 'transform 0.06s ease',
    })
    setGlare({ x: x * 100, y: y * 100, show: true })
  }

  const onLeave = () => {
    setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)', transition: 'transform 0.45s ease' })
    setGlare((g) => ({ ...g, show: false }))
  }

  return (
    <div ref={ref} style={style} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} className={`relative ${className}`}>
      {/* Glare */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: glare.show ? 1 : 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(245,158,11,0.06) 0%, transparent 55%)`,
        }}
      />
      {children}
    </div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)

  const handleClick = (project) => {
    if (project.externalLink) window.open(project.externalLink, '_blank', 'noreferrer')
    else setSelectedProject(project)
  }

  const linkIcon = (label) => label === 'GitHub' ? <FaGithub size={11} /> : <FaExternalLinkAlt size={11} />

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-28 pb-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-50 mb-3">My Projects</h1>
            <div className="w-10 h-0.5 bg-amber-400 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.08}>
          <div className="flex justify-center flex-wrap gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  activeFilter === f
                    ? 'bg-amber-500 text-[#0b0a08] shadow-md shadow-amber-500/20'
                    : 'bg-[#141210] border border-[#272219] text-stone-400 hover:text-stone-100 hover:border-amber-500/25'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const Icon = iconMap[project.icon] || FaBrain
              const style = categoryStyle[project.category]
              return (
                <motion.div
                  key={project.id} layout
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.28, delay: i * 0.04 }}
                >
                  <TiltCard
                    onClick={() => handleClick(project)}
                    className="group flex flex-col gap-4 bg-[#141210] border border-[#272219] rounded-2xl p-6 cursor-pointer hover:border-amber-500/25 transition-colors h-full"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.icon} flex items-center justify-center text-stone-50 flex-shrink-0`}>
                        <Icon size={17} />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        {project.badge && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">{project.badge}</span>
                        )}
                        <span className={`text-xs px-2.5 py-1 rounded-full border capitalize font-medium ${style.badge}`}>{project.category}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-stone-100 font-semibold text-base leading-snug mb-1 group-hover:text-amber-200 transition-colors">{project.title}</h3>
                      {project.subtitle && <p className="text-amber-500/70 text-xs font-medium mb-2 leading-snug">{project.subtitle}</p>}
                      <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[#0b0a08] text-stone-600 border border-[#272219]">{tag}</span>
                      ))}
                    </div>

                    {(project.externalLink || project.externalLinks) && (
                      <FaExternalLinkAlt size={11} className="absolute top-5 right-5 text-stone-700 group-hover:text-amber-400 transition-colors z-20" />
                    )}
                  </TiltCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/88 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141210] border border-[#272219] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-start justify-between p-6 border-b border-[#272219] flex-shrink-0">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-50 leading-tight">{selectedProject.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-stone-600 text-xs">
                    <span className="flex items-center gap-1.5"><FaCalendarAlt size={10} />{selectedProject.period}</span>
                    <span className="flex items-center gap-1.5"><FaTags size={10} />{selectedProject.tags.join(' · ')}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-stone-600 hover:text-stone-100 transition-colors ml-4 flex-shrink-0">
                  <FaTimes size={18} />
                </button>
              </div>

              {selectedProject.links && (
                <div className="flex flex-wrap gap-3 px-6 pt-5 flex-shrink-0">
                  {selectedProject.links.map((link) => (
                    <a key={link.label} href={link.href} download={link.download}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/8 border border-amber-500/20 text-amber-400 hover:bg-amber-500/12 hover:text-amber-300 transition-all text-xs font-medium">
                      <FaDownload size={11} />{link.label}
                    </a>
                  ))}
                </div>
              )}

              {selectedProject.externalLinks && (
                <div className="flex flex-wrap gap-3 px-6 pt-5 flex-shrink-0">
                  {selectedProject.externalLinks.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/8 border border-amber-500/20 text-amber-400 hover:bg-amber-500/12 hover:text-amber-300 transition-all text-xs font-medium">
                      {linkIcon(link.label)}{link.label}
                    </a>
                  ))}
                </div>
              )}

              {selectedProject.pdf && (
                <div className="flex-1 p-6 min-h-0">
                  <embed src={selectedProject.pdf} type="application/pdf" className="w-full h-full min-h-[400px] rounded-xl" />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
