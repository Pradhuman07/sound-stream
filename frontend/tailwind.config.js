/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // For Tailwind v4, dark mode should be configured differently
  theme: {
    extend: {},
  },
  plugins: [],
}
