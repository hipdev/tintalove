const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        "accent-1": "#333",
        brown: {
          500: "#665854",
          700: "#5B4025",
          800: "#4C3D3D",
          900: "#1E0A05",
        },
        cream: {
          200: "#FFE7C2",
          300: "#FAD8A7",
        },
        dark: {
          700: "#111319",
        },
        lemon: {
          200: "#DCFCC7",
          700: "#4DAF3A",
        },
        light: {
          500: "#D8D8D8",
          700: "#9DA0AC",
          900: "#707484",
        },
        juice: {
          200: "#FFC175",
          450: "#FF9755",
          500: "#F18139",
        },
        face: "#3E64CE",
        ggl: "#db4a39",
        sky: {
          300: "#61A8F3",
        },
      },
    },
  },
  variants: {
    backgroundColor: ({ before }) => before(["active"], "focus"),
    backgroundColor: ["responsive", "hover", "focus", "checked", "active"],
    borderColor: ["responsive", "hover", "focus", "active", "group-hover"],
    borderStyle: ["responsive", "hover", "focus", "active"],
    boxShadow: ["responsive", "hover", "focus", "active", "group-hover"],
    position: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
