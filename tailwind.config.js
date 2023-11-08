/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hole: "url('/src/assets/images/R.webp')",
      },
      animation: {
        "black-hole": "hole-rotate 6s ease-in-out infinite",
        ufo: "ufo-translate 7s ease-in-out forwards",
        "ufo-light": "ufo-light-show 1s 4s ease-in-out",
        typeing: `grow 4s steps(44) 1s normal both, 
                    blink 0.5s steps(44) infinite normal`,
        "wave-slow": "wave 6s linear infinite",
        "wave-fast": "wave 3s linear infinite",
        "breathe": "breathe 5s linear infinite"
      },
      keyframes: {
        "hole-rotate": {
          "0%, 100%": { transform: "rotateY(50deg)" },
          "50%": { transform: "rotateY(-50deg)" },
        },
        "ufo-translate": {
          "0%": {
            transform:
              "translateY(-200px) scale(0.1) rotate(30deg) translateX(-999px)",
          },
          "15%": {
            transform:
              "translateX(-360px) scale(0.25) rotate(15deg) translateY(-90px)",
          },
          "30%": {
            transform:
              "translateX(360px) scale(0.4) rotate(-25deg) translateY(-45px)",
          },
          "40%": { transform: "translateY(-20px) scale(0.6)" },
          "60%": { transform: "translateY(30px) scale(0.6)" },
          "80%": { transform: "translateY(30px) scale(0.6)" },
          "100%": { transform: "scale(0.2) translateY(-9999px)" },
        },
        "ufo-light-show": {
          "0%, 50%, 100%": { opacity: "0" },
          "25%,75%": { opacity: "1" },
        },
        grow: {
          "0%": { width: "0" },
          "100%": { width: "420px" },
        },
        blink: {
          "0%": {
            "border-right-color": "#4ade80",
          },
          "100%": {
            "border-right-color": "#222",
          },
        },
        wave: {
          "0%": {
            opacity: 1
          },
          "100%": {
            "outline-offset": "300px",
            "outline-offset": "300px",
            opacity: 0
          }
        },
        breathe: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            width: "400px",
            height: "400px",
          }
        }
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
