import type { Config } from 'tailwindcss'

export default {
  content: ['auto'],
  theme: {
    extend: {
      colors: {
        primary: '#1C698D',
        secondary: '#0066CC',  // Bleu Secondaire
        accent: '#4D90AD',
        yellow: '#E8D862',
        lightgrey: '#CCCCCC',
      },
    },
  },
  plugins: [],
} satisfies Config

