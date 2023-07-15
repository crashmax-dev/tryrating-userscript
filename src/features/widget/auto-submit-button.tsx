import { createSignal } from 'solid-js'
import type { Component } from 'solid-js'

const [autosubmit, setAutosubmit] = createSignal(true)

class ToggleAutoSubmit {
  get isAutoSubmit(): boolean {
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
      classList={{ enabled: autosubmit() }}
      onClick={() => toggleAutoSubmit.toggle()}
    >
      A
    </button>
  )
}
