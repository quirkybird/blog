/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hole": "url('/src/assets/images/R.webp')"
      },
      animation: {
        "black-hole": "",
      },
      keyframes: {
        "rotate": "",
      },
      
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
