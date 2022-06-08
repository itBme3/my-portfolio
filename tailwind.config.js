const TwColors = require('./utils/tailwind-colors.js');

const colors = TwColors.createColors();

module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './assets/**/*.{scss}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './content/**/*.{md,json}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  // important: true,
  safelist: [
    'text-blue-300',
    'text-purple-300',
    'text-pink-300',
    'text-yellow-300',
    {
      pattern: /^(bg-|text-|bg-opacity-|text-opacity-|bg-gradient-)/,
      variants: ['', 'sm', 'md', 'hover'],
    },
    {
      pattern: /^(border-)/,
      variants: ['hover'],
    },
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
      extend: {
        colors,
        scale: {
          97: '.97',
          103: '1.03',
        },
        fontFamily: {
          display: `'Khula', sans-serif`
        },
        maxWidth: {
          '100-2': 'calc(100% - 2rem)',
          'page': '1200px'
        }
      },
  },
  variants: {
    extend: {
      rounded: ['hover'],
      translateX: ['group-hover'],
      transform: ['group-hover'],
    }
  },
  plugins: [],
}
