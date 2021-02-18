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
        dark: {
          700: "#111319",
        },
        light: {
          500: "#D8D8D8",
          700: "#9DA0AC",
          900: "#707484",
        },
      },
      spacing: {
        609: "38rem",
        672: "42rem",
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
