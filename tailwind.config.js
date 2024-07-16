/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#26C6DA',
        secondary: '#FFFFFF',
        tertiary: '#000000',
      },
      textColor: {
        primary: "#FFFFFF",
        secondary: "#9CA3AF",
        tertiary: "#26C6DA",
      },
      backgroundColor: {
        primary: "#26C6DA",
        secondary: "#F5F5F5",
        tertiary: "#000000"
      }
    },
  },
  plugins: [],
}
