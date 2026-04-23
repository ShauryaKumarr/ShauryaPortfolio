/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#0b0a08',
          900: '#141210',
          800: '#1e1b16',
          700: '#27231c',
        },
      },
      animation: {
        'float-1': 'float1 20s ease-in-out infinite alternate',
        'float-2': 'float2 25s ease-in-out infinite alternate',
        'float-3': 'float3 18s ease-in-out infinite alternate',
        'blink': 'blink 1s step-end infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float1: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(-90px, 110px) scale(1.25)' },
        },
        float2: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(110px, -70px) scale(1.18)' },
        },
        float3: {
          '0%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '100%': { transform: 'translate(-50px, 90px) scale(0.78) rotate(90deg)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
