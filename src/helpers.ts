import ms from 'ms'
import { __DEV__, MODAL_CONTAINER, SUBMIT_BUTTON } from './constants.js'

export function getSubmitButtons(): HTMLButtonElement[] {
  const buttons: HTMLButtonElement[] = []
  const elements = Array.from(document.querySelectorAll(SUBMIT_BUTTON.selector))

  for (const element of elements) {
    if (!(element instanceof HTMLButtonElement)) continue
    if (element.textContent === SUBMIT_BUTTON.text) {
      buttons.push(element)
    }
  }

  return buttons
}

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
