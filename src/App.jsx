import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Aurora from './components/Aurora'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import Blog from './pages/Blog'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#0b0a08] text-stone-100 flex flex-col font-sans">
      <Cursor />
      <ScrollProgress />
      <Aurora />
      <Navbar />
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
