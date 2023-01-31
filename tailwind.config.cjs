/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "sansita": ['Sansita Swashed', 'cursive'],
      "kanit": ['Kanit', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
