let numbersToFind = 12

let arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
]

const hola = () => {
  for (let i = 0; i < arr.length; i++) {
    const numbers = arr[i]

    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j] == numbersToFind) {
        return true
      }
    }
  }
}

export { hola }
