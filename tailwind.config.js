/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e1e24',
        secondary: '#f6f7eb',
        middle: '#e94f37'
      }
    },
  },
  plugins: [],
}

