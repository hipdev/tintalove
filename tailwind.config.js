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
        dark: {
          500: '#111319', // new layout design
          600: '#10101DF2', // new layout design
          700: '#1f1f1f',
          800: '#030308', // new layout design
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
      },
      spacing: {
        448: '28rem',
        609: '38rem',
      },
    },
  },
  variants: {
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
