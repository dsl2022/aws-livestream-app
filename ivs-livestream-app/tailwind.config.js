/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust the paths according to your project structure
    // Add more paths if you have other file types, like HTML
  ],
  theme: {
    extend: {
      width: {
        '160': '640px', // Custom width
      },
      height: {
        '120': '480px', // Custom height
      },
    },
  },
  plugins: [],
}

