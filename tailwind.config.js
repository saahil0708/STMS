/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danger: '#991b1b', // Adding danger as an alias
      },
      maxWidth: {
        '8xl': '90rem', // 1440px
      }
    },
  },
  plugins: [],
}