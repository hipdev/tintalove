const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: '#158e72',
        primaryHover: '#126b56',
        dark: {
          500: '#111319', // new layout design
          700: '#1f1f1f',
          800: '#080A12', // new layout design
        },
        light: {
          500: '#D8D8D8',
          700: '#090909',
          900: '#707484',
        },
      },
      spacing: {
        609: '38rem',
        672: '42rem',
      },
    },
  },
  variants: {
    backgroundColor: ({ before }) => before(['active'], 'focus'),
    backgroundColor: ['responsive', 'hover', 'focus', 'checked', 'active'],
    borderColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    borderStyle: ['responsive', 'hover', 'focus', 'active'],
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    position: ['responsive', 'hover', 'focus'],
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
