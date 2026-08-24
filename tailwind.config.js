/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bauhaus / Mid-Century Palette
        bauhaus: {
          bg: '#F5F5F0',       // Off-white canvas
          text: '#2D3748',     // Deep graphite for text
          red: '#E04733',      // Terracotta red
          yellow: '#EAB308',   // Mustard yellow
          blue: '#1E3A8A',     // Navy blue
          grey: '#D1D5DB'      // Inactive/subtle lines
        }
      },
      fontFamily: {
        sans: ['Inter', -apple-system, 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}