import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-caslon)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0E0E0E',
        cream: '#F5F0E8',
        paper: '#FAF8F4',
        accent: '#C8441A',
      },
      fontSize: {
        '2xs': ['0.65rem', { letterSpacing: '0.12em' }],
      },
    },
  },
  plugins: [],
}
export default config
