export const capitalizeAllWords = (s: string) => {
  if (typeof s !== 'string') return ''

  const words = s.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  )

  return words
}
