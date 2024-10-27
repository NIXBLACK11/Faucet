/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Pixel', 'sans-serif'],
      },
      colors: {
        background: 'var(--background-color)',
        text: 'var(--text-color)',
        border: 'var(--border-color)',
      },
    },
  },
  plugins: [],
}