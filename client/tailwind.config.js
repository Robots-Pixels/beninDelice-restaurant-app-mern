/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": '#D8A05A',
        "secondary": '#FFF8EE',
        "third": "#402E32",
        // "third-light": "rgba(64, 46, 50, 0.7)",
      },
    },

    fontFamily: {
      'island': ['Island Moments', 'sans-serif'],
    },

  },
  plugins: [],
}