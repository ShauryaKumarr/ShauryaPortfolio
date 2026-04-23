import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { blogPosts } from '../data/blogPosts'
import ScrollReveal from '../components/ScrollReveal'
import { FaRegCalendarAlt, FaRegClock, FaRegHeart, FaHeart, FaChevronDown, FaChevronUp } from 'react-icons/fa'

function useLikes(postId) {
  const k = `blog_${postId}`
  const [liked, setLiked] = useState(() => localStorage.getItem(`${k}_liked`) === 'true')
  const [count, setCount] = useState(() => parseInt(localStorage.getItem(`${k}_count`) || '0', 10))

  const toggle = (e) => {
    e.stopPropagation()
    const next = !liked
    const nextCount = next ? count + 1 : count - 1
    setLiked(next)
    setCount(nextCount)
    localStorage.setItem(`${k}_liked`, String(next))
    localStorage.setItem(`${k}_count`, String(nextCount))
  }
  return { liked, count, toggle }
}

function BlogPost({ post }) {
  const [expanded, setExpanded] = useState(false)
  const { liked, count, toggle } = useLikes(post.id)

  return (
    <article className="bg-[#141210] border border-[#272219] rounded-2xl overflow-hidden hover:border-amber-500/20 transition-colors duration-300">
      <div className="p-6 md:p-8 cursor-pointer" onClick={() => setExpanded((v) => !v)}>
        <h2 className="text-2xl font-bold text-stone-50 mb-3">{post.title}</h2>
        <div className="flex items-center gap-5 text-stone-600 text-xs mb-4">
          <span className="flex items-center gap-1.5"><FaRegCalendarAlt size={11} />{post.date}</span>
          <span className="flex items-center gap-1.5"><FaRegClock size={11} />{post.readTime}</span>
        </div>
        <p className="text-stone-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
        <button className="flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors">
          {expanded ? <><FaChevronUp size={11} />Collapse</> : <><FaChevronDown size={11} />Read more</>}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 space-y-4 border-t border-[#272219] pt-6">
              {post.content.map((para, i) => (
                <p key={i} className="text-stone-300 text-base leading-relaxed">{para}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between px-6 md:px-8 py-4 border-t border-[#272219]">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#0b0a08] text-stone-600 border border-[#272219]">{tag}</span>
          ))}
        </div>
        <button
          onClick={toggle}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${liked ? 'text-amber-400 bg-amber-500/10' : 'text-stone-600 hover:text-stone-300 hover:bg-[#0b0a08]'}`}
        >
          {liked ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
          <span className="font-medium">{count}</span>
        </button>
      </div>
    </article>
  )
}

export default function Blog() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-28 pb-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-50 mb-3">My Journey</h1>
            <div className="w-10 h-0.5 bg-amber-400 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <p className="text-stone-500 text-base md:text-lg leading-relaxed text-center mb-14">
            A personal blog where I share experiences, challenges, and lessons learned through technology, research, and entrepreneurship — raw and unfiltered.
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1}>
              <BlogPost post={post} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="mt-8 bg-[#141210] border border-[#272219] rounded-2xl p-10 text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-4xl mb-5"
            >
              ✍️
            </motion.div>
            <h3 className="text-xl font-bold text-stone-100 mb-3">More Posts Coming Soon</h3>
            <p className="text-stone-500 text-sm leading-relaxed max-w-md mx-auto">
              Working on posts about hackathons, research challenges, and the entrepreneurship journey. Check back soon!
            </p>
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  )
}
