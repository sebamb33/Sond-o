/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        ".src/layouts/**/*.{js,jsx,ts,tsx}",
        "*.{tsx}",
        "./src/app/**/*.{js,jsx,ts,tsx}",
        "./src/app/*.{js,jsx,ts,tsx}",
        "./src/app/**/*.{js,jsx,ts,tsx}",
        // Ajoutez d'autres dossiers où vous utilisez des classes Tailwind, si nécessaire.
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2e4eda",
                secondary: "#121fa2",
                accent: "#ee4335",
                yellow: '#E8D862',
                lightgrey: '#CCCCCC',
            },
            backgroundImage: {
                'custom-gradient': 'linear-gradient(41deg, #2e4eda 39%, #121fa2 100%)',
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
    plugins: [require("daisyui"), require('tailwind-scrollbar')],
}
as
Config;

