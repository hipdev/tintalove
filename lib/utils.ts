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

export function checkUrl(url, website) {
  const regexUrl = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  )

  const isLink = regexUrl.test(url)
  if (isLink) {
    return url
  } else {
    return `${website}/${url}`
  }
}
