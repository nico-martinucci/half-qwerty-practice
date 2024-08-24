import { rows } from "./types"

function getRandomLength() {
  return Math.floor(Math.random() * 4 + 3)
}

export const generators = {
  top: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  middle: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  bottom: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],

  generate(wordSets: rows[]) {
    const letters = wordSets.reduce((prev, curr) => [...prev, ...this[curr]], [] as string[])

    const length = getRandomLength()
    let output = ''

    for (let i = 0; i < length; i++) {
      output += letters[Math.floor(Math.random() * letters.length)]
    }

    return output
  }
}