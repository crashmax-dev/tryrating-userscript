import type { Component } from 'solid-js'

import { tooltip } from '../../utils/tooltip.js'
import { closeModal } from '../close-modal.js'

export const ToggleAutoCloseModalButton: Component = () => {
  return (
    <button
      {...tooltip({ label: 'Auto close', position: 'left', size: 'medium' })}
      classList={{ enabled: closeModal.autoClose }}
      onClick={() => closeModal.toggleAutoClose()}
    >
      M
    </button>
  )
}
