import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
        editorial: ["DM Sans", "sans-serif"],
        modern: ["Space Grotesk", "sans-serif"],
        hero: ["Bodoni Moda", "Georgia", "serif"],
        statement: ["Syne", "sans-serif"],
      },

      colors: {
        crystal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
      },

      keyframes: {
        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },

      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },

  plugins: [typography],
};
