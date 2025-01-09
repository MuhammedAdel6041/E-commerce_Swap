/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "main": "#E93D82",
        "subMain": "#be185d",
         
      },
    },
  },
  plugins: [],
}