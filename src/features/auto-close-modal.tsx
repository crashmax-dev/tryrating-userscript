import { __DEV__ } from '../constants.js'
import { createLocalStore } from '../utils/create-local-storage.js'
import { logger } from '../utils/logger.js'
import type { Component } from 'solid-js'

const MODAL_CONTAINER_VISIBLE_SELECTOR = '.modal-container.visible'
const MODAL_CONTENT_SELECTOR = 'div[modalwrapref] > div'
const MODAL_CONTENT_TEXT = 'Validation failed!'

const [autoClose, setAutoClose] = createLocalStore('auto-close-modal', {
  value: true
})

function toggleAutoClose() {
  setAutoClose({ value: !autoClose.value })
}

export function autoCloseModal(): void {
  if (!autoClose.value) return

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

export const ToggleAutoCloseModalButton: Component = () => {
  return (
    <button
      classList={{ enabled: autoClose.value }}
      onClick={() => toggleAutoClose()}
    >
      M
    </button>
  )
}
