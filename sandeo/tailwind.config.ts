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
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1d4ed8",
          "secondary": "#0ea5e9",
          "accent": "#10b981",
          "neutral": "#ffffff",
          "base-100": "#ffffff",
          "info": "#ffffff",
          "success": "#84cc16",
          "warning": "#ffffff",
          "error": "#e11d48",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config

