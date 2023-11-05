/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hole": "url('/src/assets/images/R.webp')"
      },
      animation: {
        "black-hole": "hole-rotate 6s ease-in-out infinite",
        "ufo": "ufo-translate 6s ease-in-out forwards",
      },
      keyframes: {
        "hole-rotate": {
          '0%, 100%': {transform: 'rotateY(50deg)'},
          '50%': {transform: 'rotateY(-50deg)'}
        },
        "ufo-translate": {
          '0%': {transform:'translateY(-200px) scale(0.1) rotate(30deg) translateX(-999px)'},
          '15%': {transform:'translateX(-360px) scale(0.25) rotate(15deg) translateY(-150px)'},
          '40%': {transform:'translateX(360px) scale(0.5) rotate(-25deg) translateY(20px)'},
          '60%':{transform: 'scale(0.5)'},
          '100%':{transform: 'translateY(120px) scale(0.8)'},
        },
      },
      
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
