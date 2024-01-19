/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // 'primary':'#fff',
        'primary':'#334155',
        'button':'#111827'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
    },
  },
  plugins: [],
}