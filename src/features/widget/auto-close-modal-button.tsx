import { closeModal } from '../close-modal.js'
import type { Component } from 'solid-js'

export const ToggleAutoCloseModalButton: Component = () => {
  return (
    <button
      classList={{ enabled: closeModal.autoClose }}
      onClick={() => closeModal.toggleAutoClose()}
    >
      M
    </button>
  )
}
