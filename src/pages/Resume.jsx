import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa'

const RESUME = '/assets/Shaurya_Kumar_Resume_Jan2026.pdf'

export default function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-28 pb-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-50 mb-3">Resume</h1>
            <div className="w-10 h-0.5 bg-amber-400 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
            <a
              href={RESUME} download
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 text-[#0b0a08] font-bold text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              <FaDownload size={13} /> Download PDF
            </a>
            <a
              href={RESUME} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#272219] text-stone-400 font-semibold text-sm hover:border-amber-500/35 hover:text-stone-100 transition-all"
            >
              <FaExternalLinkAlt size={12} /> Open in new tab
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <div className="w-full rounded-2xl overflow-hidden border border-[#272219] bg-[#141210] shadow-2xl shadow-black/50">
            <embed src={RESUME} type="application/pdf" className="w-full" style={{ height: 'max(70vh, 600px)' }} />
          </div>
          <p className="text-center text-stone-700 text-xs mt-4">If the PDF does not load, use the download button above.</p>
        </ScrollReveal>
      </div>
    </motion.div>
  )
}
