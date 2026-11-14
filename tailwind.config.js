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
        sans: ["Inter", "Manrope", "sans-serif"],
        display: ["Manrope", "Fraunces", "Georgia", "serif"],
        editorial: ["DM Sans", "sans-serif"],
        modern: ["Space Grotesk", "sans-serif"],
        hero: ["Bodoni Moda", "Georgia", "serif"],
        statement: ["Syne", "sans-serif"],
      },

      colors: {
        // Legacy teal palette (still referenced across components)
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
        // Blueprint brand palette (LUCKY CRYSTAL / UI REDESIGN BLUEPRINT §03)
        ink: {
          DEFAULT: "#172432",
          soft: "#2A3A4B",
          muted: "#5A6573",
        },
        indigo: {
          DEFAULT: "#5D50E8",
          soft: "#ECEAFE",
          deep: "#3F35C7",
        },
        coral: {
          DEFAULT: "#F46E57",
          soft: "#FDE4DD",
          deep: "#D8523C",
        },
        mint: {
          DEFAULT: "#BDE8D4",
          soft: "#E7F6EF",
          deep: "#8FD2B6",
        },
        paper: "#F8F7F3",
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
