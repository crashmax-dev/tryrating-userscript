import { randomNum } from '@zero-dependency/utils'

export function randomMsOffset(ms: number): number {
  const randomOffset = randomNum(-5, 15) // -5/-15 seconds
  return ms + randomOffset * 1000
}
