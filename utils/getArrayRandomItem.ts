import { getRandomIntInclusive } from "./getRandomIntInclusive"

export const getArrayRandomItem = <T>(arr: T[]): T => {
  return arr[getRandomIntInclusive(0, arr.length - 1)]
}