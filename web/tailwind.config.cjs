/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#F6F6F6",
          150: "#F2F2F2",
          300: "#ACACAC",
          500: "#323232"
        },
      }
    },
  },
  plugins: []
}
