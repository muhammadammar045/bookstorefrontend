/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E0F7FA',
          200: '#B2EBF2',
          300: '#80DEEA',
          400: '#4DD0E1',
          500: '#26C6DA',
          600: '#00BCD4',
          700: '#00ACC1',
          800: '#0097A7',
          900: '#00838F',
        },
      }
    },
  },
  plugins: [],
}
