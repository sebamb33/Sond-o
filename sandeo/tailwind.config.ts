import type { Config } from 'tailwindcss'

export default {
  content: ['auto'],
  theme: {
    extend: {
      colors: {
        primary: "#2e4eda",
        secondary: "#121fa2",
        accent: "#ee4335",
        yellow: '#E8D862',
        lightgrey: '#CCCCCC',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2e4eda",
          "secondary": "#121fa2",
          "accent": "#ee4335",
          "neutral": "#99e8ef",
          "base-100": "#fcffff",
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

