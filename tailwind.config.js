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
      fontSize: {
        atomico: '.65rem',
      },
      colors: {
        primary: '#158e72',
        primaryHover: '#126b56',
        dark: {
          500: '#111319',
          600: '#10101DF2', // new layout design
          700: '#1f1f1f',
          800: '#080A12', // new layout design
        },
        light: {
          200: '#D7DAE6',
          400: '#9296AA',
          500: '#D8D8D8',
          600: '#6B6E82',
          700: '#090909',
          800: '#6B6E82',
          900: '#707484',
        },
        ocean_blue: {
          200: '#222639',
          800: '#1A1D2F',
          900: '#151421',
        },
      },
      spacing: {
        609: '38rem',
        650: '21.87rem',
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
    gap: ['responsive'],
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
