const withPWA = require('next-pwa')
const isDev = process.env.NODE_ENV === 'development'
module.exports = withPWA({
  pwa: {
    // disable: isDev,
    dest: 'public',
  },
})
