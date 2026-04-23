import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.classList.add('has-cursor')
    document.documentElement.style.cursor = 'none'
    document.body.style.cursor = 'none'

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -200, mouseY = -200
    let ringX = -200, ringY = -200
    let ringSize = 28
    let targetRingSize = 28
    let raf

    const setVisible = (v) => {
      dot.style.opacity = v ? '1' : '0'
      ring.style.opacity = v ? '1' : '0'
    }

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
      setVisible(true)
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.28
      ringY += (mouseY - ringY) * 0.28
      ringSize += (targetRingSize - ringSize) * 0.12

      ring.style.transform = `translate(${ringX - ringSize / 2}px, ${ringY - ringSize / 2}px)`
      ring.style.width = `${ringSize}px`
      ring.style.height = `${ringSize}px`
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        targetRingSize = 46
        ring.style.borderColor = 'rgba(251,191,36,0.7)'
        ring.style.backgroundColor = 'rgba(245,158,11,0.06)'
        dot.style.backgroundColor = '#fbbf24'
        dot.style.boxShadow = '0 0 8px rgba(251,191,36,0.6)'
      }
    }

    const onOut = (e) => {
      if (!e.relatedTarget?.closest('a, button, [data-hover]')) {
        targetRingSize = 28
        ring.style.borderColor = 'rgba(245,158,11,0.4)'
        ring.style.backgroundColor = 'transparent'
        dot.style.backgroundColor = '#f59e0b'
        dot.style.boxShadow = 'none'
      }
    }

    setVisible(false)
    loop()
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseleave', () => setVisible(false))
    document.addEventListener('mouseenter', () => setVisible(true))

    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      document.documentElement.style.cursor = ''
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          width: 6, height: 6,
          borderRadius: '50%',
          backgroundColor: '#f59e0b',
          pointerEvents: 'none',
          transition: 'background-color 0.2s, box-shadow 0.2s, opacity 0.25s',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          width: 28, height: 28,
          borderRadius: '50%',
          border: '1.5px solid rgba(245,158,11,0.4)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          transition: 'border-color 0.25s, background-color 0.25s, opacity 0.25s',
        }}
      />
    </>
  )
}
