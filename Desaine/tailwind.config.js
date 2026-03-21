const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#090B10',
        surface: '#111318',
        'surface-elevated': '#171A21',
        primary: '#6F7CFF',
        secondary: '#37D6B5',
        text: '#F5F7FB',
        'text-soft': '#C5CCDA',
        'outline-ghost': 'rgba(255,255,255,0.12)',
        'glass-fill': 'rgba(255,255,255,0.08)',
        'glass-stroke': 'rgba(255,255,255,0.18)',
        'glass-highlight': 'rgba(255,255,255,0.34)',
      },
      fontFamily: {
        display: ['Syne', ...defaultTheme.fontFamily.sans],
        body: ['Manrope', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        glass: '0 24px 60px rgba(0,0,0,0.34), 0 1px 0 rgba(255,255,255,0.10)',
        halo: '0 0 36px rgba(111,124,255,0.28)',
        insetglass: 'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.04)',
      },
      backdropBlur: {
        glass: '18px',
      },
      borderRadius: {
        xl2: '1.75rem',
        xl3: '2rem',
      },
      maxWidth: {
        prosewide: '88rem',
      },
      backgroundImage: {
        'hero-fade': 'linear-gradient(180deg, rgba(9,11,16,0.08) 0%, rgba(9,11,16,0.76) 70%, #090B10 100%)',
        'primary-sheen': 'linear-gradient(135deg, rgba(111,124,255,0.95) 0%, rgba(111,124,255,0.72) 40%, rgba(159,167,255,0.48) 100%)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
}
