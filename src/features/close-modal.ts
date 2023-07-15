import { __DEV__ } from '../constants.js'
import { createLocalStore } from '../utils/create-local-storage.js'
import { logger } from '../utils/logger.js'

const MODAL_CONTAINER_VISIBLE_SELECTOR = '.modal-container.visible'
const MODAL_CONTENT_SELECTOR = 'div[modalwrapref] > div'
const MODAL_CONTENT_TEXT = 'Validation failed!'

const [autoClose, setAutoClose] = createLocalStore('auto-close-modal', {
  value: true
})

class CloseModal {
  get autoClose(): boolean {
    return autoClose.value
  }

  toggleAutoClose(): void {
    setAutoClose({ value: !autoClose.value })
  }

  closeValidationFailed(): void {
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
        logger.info('Modal closed')
        modalButton.click()
      }
    }
  }
}

export const closeModal = new CloseModal()
