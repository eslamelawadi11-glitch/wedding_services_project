/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Romantic Rose - Primary brand color
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899', // Main primary
          600: '#db2777',
          700: '#be185d',
          800: '#9f1239',
          900: '#831843',
        },
        // Elegant Gold - Accent color
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Main gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Soft Blush - Secondary accent
        blush: {
          50: '#fef7f7',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
        // Cream/Beige - Neutral backgrounds
        cream: {
          50: '#fefdfb',
          100: '#fef9f3',
          200: '#fef3e7',
          300: '#fdecd4',
          400: '#fbd5a5',
          500: '#f9c470',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'], // Elegant serif for headings
        'body': ['Inter', 'system-ui', 'sans-serif'], // Clean sans-serif for body
        'elegant': ['Cormorant Garamond', 'serif'], // Alternative elegant font
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elegant': '0 4px 20px rgba(236, 72, 153, 0.1)',
      },
      borderRadius: {
        'elegant': '12px',
      },
    },
  },
  plugins: [],
}

