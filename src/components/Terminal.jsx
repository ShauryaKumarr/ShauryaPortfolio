import { useState, useEffect, useRef, useCallback } from 'react'

const PROMPT = 'shaurya@portfolio:~$'

const NEOFETCH = [
  { art: '  ░░░░░░░░░░░░  ', key: '',           val: 'shaurya@portfolio',           valClass: 'text-stone-50 font-bold' },
  { art: '░░░░░░░░░░░░░░░░', key: '',           val: '─────────────────────────────', valClass: 'text-stone-700' },
  { art: '░░░░░░░░░░░░░░░░', key: 'OS         ', val: 'Human v22',                   valClass: 'text-stone-200' },
  { art: '░░░░░░░░░░░░░░░░', key: 'Education  ', val: 'CS + Applied Math @ UDel',    valClass: 'text-stone-200' },
  { art: '░░░░░░░░░░░░░░░░', key: 'Research   ', val: 'AI/ML · LLMs & RAG · CV',     valClass: 'text-stone-200' },
  { art: '░░░░░░░░░░░░░░░░', key: 'Hackathons ', val: '3+ wins (HenHacks, HopHacks)', valClass: 'text-stone-200' },
  { art: '  ░░░░░░░░░░░░  ', key: 'Location   ', val: 'Newark, Delaware',             valClass: 'text-stone-200' },
  { art: '                ', key: 'Goal       ', val: 'Build something that matters', valClass: 'text-amber-400' },
]

const COMMANDS = {
  whoami: [
    { text: 'Shaurya Kumar — CS & Applied Math @ University of Delaware', cls: 'text-stone-200' },
    { text: 'AI/ML researcher · Hackathon champion · Aspiring founder', cls: 'text-stone-400' },
  ],
  neofetch: [{ type: 'neofetch' }],
  'ls projects/': [
    { text: 'AI_Researcher_UD/    RoomieUD/    SurgiScan/', cls: 'text-amber-400' },
    { text: 'FootPrint/           SentinelAid/ WallOfSupport/', cls: 'text-amber-400' },
  ],
  'ls skills/': [
    { text: 'Languages: Python  JavaScript  TypeScript  Java  C++  C  SQL  R', cls: 'text-stone-300' },
    { text: 'Frameworks: React  PyTorch  TensorFlow  FastAPI  LangChain', cls: 'text-stone-300' },
    { text: 'Areas: AI/ML  LLMs & RAG  Computer Vision  FinTech  Quantum Computing', cls: 'text-stone-300' },
  ],
  'cat interests': [
    { text: 'AI/ML · Large Language Models · Computer Vision', cls: 'text-stone-200' },
    { text: 'Quantum Computing · FinTech · Mathematics · Entrepreneurship', cls: 'text-stone-200' },
    { text: 'Soccer · FC Barcelona Fan', cls: 'text-stone-200' },
  ],
  './contact': [
    { text: 'Email     shaurya@udel.edu', cls: 'text-stone-200' },
    { text: 'GitHub    github.com/ShauryaKumarr', cls: 'text-stone-200' },
    { text: 'LinkedIn  linkedin.com/in/shauryak', cls: 'text-stone-200' },
  ],
  pwd: [{ text: '/home/shaurya/portfolio', cls: 'text-amber-400' }],
  'echo $goal': [{ text: 'Build something that matters.', cls: 'text-amber-400 italic' }],
  help: [
    { text: 'Available commands:', cls: 'text-stone-300 font-semibold' },
    { text: '  whoami         — about me', cls: 'text-stone-400' },
    { text: '  neofetch       — system info', cls: 'text-stone-400' },
    { text: '  ls projects/   — list projects', cls: 'text-stone-400' },
    { text: '  ls skills/     — list skills', cls: 'text-stone-400' },
    { text: '  cat interests  — areas of focus', cls: 'text-stone-400' },
    { text: '  ./contact      — get in touch', cls: 'text-stone-400' },
    { text: '  pwd            — current path', cls: 'text-stone-400' },
    { text: '  echo $goal     — my goal', cls: 'text-stone-400' },
    { text: '  clear          — clear terminal', cls: 'text-stone-400' },
  ],
  clear: [{ type: 'clear' }],
}

const INTRO_SEQUENCE = [
  { cmd: 'whoami', delay: 700 },
  { cmd: 'neofetch', delay: 400 },
]

export default function Terminal() {
  const [history, setHistory] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [phase, setPhase] = useState('intro')
  const [typingText, setTypingText] = useState('')
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const cancelRef = useRef(false)

  const appendLines = useCallback((lines) => {
    setHistory((prev) => [...prev, ...lines])
  }, [])

  const execCommand = useCallback((cmd) => {
    const key = cmd.trim().toLowerCase()
    const match = COMMANDS[key]
    if (!match) {
      appendLines([
        { type: 'command', text: cmd },
        { type: 'output', lines: [{ text: `command not found: ${key} — try 'help'`, cls: 'text-red-400' }] },
      ])
    } else if (match[0]?.type === 'clear') {
      setHistory([])
    } else if (match[0]?.type === 'neofetch') {
      appendLines([{ type: 'command', text: cmd }, { type: 'neofetch' }])
    } else {
      appendLines([{ type: 'command', text: cmd }, { type: 'output', lines: match }])
    }
  }, [appendLines])

  // Auto-type intro
  useEffect(() => {
    cancelRef.current = false

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

    const typeCmd = (text) =>
      new Promise((resolve) => {
        let i = 0
        setTypingText('')
        const tick = () => {
          if (cancelRef.current) return resolve()
          i++
          setTypingText(text.slice(0, i))
          if (i < text.length) setTimeout(tick, 52)
          else setTimeout(resolve, 280)
        }
        tick()
      })

    const run = async () => {
      for (let i = 0; i < INTRO_SEQUENCE.length; i++) {
        const { cmd, delay } = INTRO_SEQUENCE[i]
        await sleep(i === 0 ? delay : 550)
        if (cancelRef.current) return
        await typeCmd(cmd)
        if (cancelRef.current) return
        execCommand(cmd)
        setTypingText('')
      }
      if (!cancelRef.current) setPhase('ready')
    }

    run()
    return () => { cancelRef.current = true }
  }, [execCommand])

  // Scroll terminal body only — never touches the page scroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history, typingText])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputVal.trim()) return
    execCommand(inputVal)
    setInputVal('')
  }

  return (
    <div
      className="bg-[#09080a] border border-[#272219] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 font-mono text-sm select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1e1b16] bg-[#0e0c09]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-stone-600 tracking-wide">shaurya@portfolio — bash</span>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="p-4 h-[210px] overflow-y-auto terminal-scroll space-y-1">
        {history.map((entry, i) => {
          if (entry.type === 'command') {
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="text-amber-400 flex-shrink-0 select-none">{PROMPT}</span>
                <span className="text-stone-100">{entry.text}</span>
              </div>
            )
          }
          if (entry.type === 'output') {
            return (
              <div key={i} className="pl-0 space-y-0.5">
                {entry.lines.map((l, j) => (
                  <div key={j} className={`leading-relaxed ${l.cls}`}>{l.text}</div>
                ))}
              </div>
            )
          }
          if (entry.type === 'neofetch') {
            return (
              <div key={i} className="space-y-0.5 py-1">
                {NEOFETCH.map((row, j) => (
                  <div key={j} className="flex items-baseline gap-3">
                    <span className="text-amber-500/80 flex-shrink-0 text-xs leading-5">{row.art}</span>
                    <span className="text-stone-500 flex-shrink-0 text-xs">{row.key}</span>
                    <span className={`text-xs ${row.valClass}`}>{row.val}</span>
                  </div>
                ))}
              </div>
            )
          }
          return null
        })}

        {/* Auto-typing line */}
        {phase === 'intro' && (
          <div className="flex items-start gap-2">
            <span className="text-amber-400 flex-shrink-0 select-none">{PROMPT}</span>
            <span className="text-stone-100">
              {typingText}
              <span className="animate-blink ml-px">▌</span>
            </span>
          </div>
        )}

        {/* User input */}
        {phase === 'ready' && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 flex-shrink-0 select-none">{PROMPT}</span>
              <input
                ref={inputRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent text-stone-100 outline-none caret-amber-400 min-w-0"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="none"
              />
            </div>
          </form>
        )}

      </div>

      {/* Footer hint */}
      <div className="px-4 py-2 border-t border-[#1e1b16] bg-[#0e0c09]">
        <span className="text-stone-700 text-[11px]">type <span className="text-stone-500">'help'</span> to see available commands</span>
      </div>
    </div>
  )
}
