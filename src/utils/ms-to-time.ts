import { addZero } from '@zero-dependency/utils'

export function msToTimeString(ms: number): string {
  const minutes = addZero(Math.floor(ms / 60000))
  const seconds = addZero(Number(((ms % 60000) / 1000).toFixed(0)))
  return `${minutes}:${seconds}`
}
