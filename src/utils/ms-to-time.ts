import { addZero } from '@zero-dependency/utils'

function msToSeconds(ms: number): string {
  return addZero(Number(((ms % 60000) / 1000).toFixed(0)))
}

export function msToTime(ms: number): string {
  const minutes = addZero(Math.floor(ms / 60000))
  const seconds = msToSeconds(ms)
  return `${minutes}:${seconds}`
}

export function msToTimeFull(ms: number): string {
  const hours = addZero(Math.floor(ms / 3600000))
  const minutes = addZero(Math.floor((ms % 3600000) / 60000))
  const seconds = msToSeconds(ms)
  return `${hours}:${minutes}:${seconds}`
}
