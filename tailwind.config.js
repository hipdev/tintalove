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
        bl: {
          100: '#C2E9FF',
          200: '#5FC2FF',
          300: '#33A8FF',
          400: '#008DFF',
          500: '#0071F3',
        },
        dark: {
          500: '#111319', // new layout design
          600: '#10101DF2', // new layout design
          700: '#1f1f1f',
          800: '#030308', // new layout design
        },
        light: {
          200: '#D7DAE6',
          400: '#9296AA',
          500: '#D8D8D8',
          600: '#6B6E82',
          700: '#090909',
          900: '#707484',
        },
        gn: {
          100: '#99F7CC',
          200: '#18D886',
          300: '#0CC78B',
          400: '#0EAC77',
          500: '#15966F',
        },
        gr: {
          100: '#F5F8FA',
          200: '#C7D0D8',
          300: '#B2BCC6',
          400: '#89939F',
          500: '#6C7682',
          600: '#363A46',
          700: '#1E202B',
          800: '#111319',
          900: '#030308',
        },
        rd: {
          100: '#FFD8D4',
          200: '#FF9B94',
          300: '#FF716C',
          400: '#FF5051',
          500: '#ED1826',
        },
        yll: {
          100: '#FCE298',
          200: '#FACA47',
          300: '#ECB115',
          400: '#DC9600',
          500: '#C57D00',
        },
      },
      spacing: {
        560: '35rem',
        448: '28rem',
        560: '35rem',
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
