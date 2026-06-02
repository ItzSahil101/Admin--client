/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",     // Deep blue
        secondary: "#FB923C",   // Orange
      },
    },
  },
  plugins: [],
};
