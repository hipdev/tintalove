export const capitalizeAllWords = (s: string) => {
  if (typeof s !== 'string') return ''

  const words = s.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  )

  return words
}

export function url_domain(data) {
  var a = document.createElement('a')
  a.href = data
  return a.hostname
}
