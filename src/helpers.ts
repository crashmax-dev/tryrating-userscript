import { addZero } from '@zero-dependency/utils'
import ms from 'ms'
import { __DEV__, MODAL_CONTAINER_VISIBLE, MODAL_CONTENT } from './constants.js'

const MODAL_CONTENT_TEXT = 'Validation failed!'

export function closeModalValidationFailed(): void {
  const modalContainer = document.querySelector(MODAL_CONTAINER_VISIBLE)
  if (!modalContainer) return

  const modalContent = modalContainer.querySelector(MODAL_CONTENT)
  if (!modalContent) return

  if (modalContent.textContent === MODAL_CONTENT_TEXT) {
    GM_notification({
      title: document.title,
      text: MODAL_CONTENT_TEXT,
      highlight: true,
      silent: false,
      timeout: 1000
    })

    modalContainer.querySelector('button')?.click()
  }
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

export function millisToMinutesAndSeconds(ms: number): string {
  const minutes = addZero(Math.floor(ms / 60000))
  const seconds = addZero(Number(((ms % 60000) / 1000).toFixed(0)))
  return `${minutes}:${seconds}`
}
