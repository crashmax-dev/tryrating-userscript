import ms from 'ms'
import { __DEV__, MODAL_CONTAINER } from './constants.js'

export function getModal(): Element | null {
  return document.querySelector(MODAL_CONTAINER)
}

export function parseTimeToMs(time: string): number {
  const times = time
    // by karkar1ch1
    .split(/\s(?=\d)/)

  return times.reduce((acc, value) => {
    // @ts-ignore
    acc += ms(value)
    return acc
  }, 0)
}
