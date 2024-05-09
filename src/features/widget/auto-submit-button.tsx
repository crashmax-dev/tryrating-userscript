import { createSignal } from 'solid-js'
import type { Component } from 'solid-js'

import { tooltip } from '../../utils/tooltip.js'

const [autosubmit, setAutosubmit] = createSignal(true)

class ToggleAutoSubmit {
  get isEnabled(): boolean {
    return autosubmit()
  }

  toggle(): void {
    setAutosubmit(!autosubmit())
  }
}

export const toggleAutoSubmit = new ToggleAutoSubmit()

export const ToggleAutoSubmitButton: Component = () => {
  return (
    <button
      {...tooltip({ label: 'Auto submit', position: 'left', size: 'medium' })}
      classList={{ enabled: autosubmit() }}
      onClick={() => toggleAutoSubmit.toggle()}
    >
      A
    </button>
  )
}
