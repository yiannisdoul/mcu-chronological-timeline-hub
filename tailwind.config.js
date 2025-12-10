/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // 👇 THIS LINE TELLS TAILWIND TO LOOK IN SRC FOLDER
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}