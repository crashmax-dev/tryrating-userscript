import { __DEV__ } from '../constants.js'
import { logger } from '../utils/logger.js'

const MODAL_CONTAINER_VISIBLE_SELECTOR = '.modal-container.visible'
const MODAL_CONTENT_SELECTOR = 'div[modalwrapref] > div'
const MODAL_CONTENT_TEXT = 'Validation failed!'

export function autoCloseModal(): void {
  const modalContainer = document.querySelector(
    MODAL_CONTAINER_VISIBLE_SELECTOR
  )
  if (!modalContainer) return

  const modalContent = modalContainer.querySelector(MODAL_CONTENT_SELECTOR)
  if (!modalContent) return

  if (modalContent.textContent === MODAL_CONTENT_TEXT) {
    GM_notification({
      title: document.title,
      text: MODAL_CONTENT_TEXT,
      highlight: true,
      silent: false,
      timeout: 1000
    })

    const modalButton = modalContainer.querySelector('button')
    if (modalButton) {
      logger.log('Modal closed')
      modalButton.click()
    }
  }
}
