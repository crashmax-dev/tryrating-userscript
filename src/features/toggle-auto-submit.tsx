import { createSignal } from 'solid-js'
import type { Component } from 'solid-js'

const [autosubmit, setAutosubmit] = createSignal(true)

function toggleAutosubmit() {
  setAutosubmit(!autosubmit())
}

export function createToggleAutosubmit() {
  return {
    get autosubmit() {
      return autosubmit()
    },
    toggleAutosubmit
  }
}

export const ToggleAutoSubmitButton: Component = () => {
  return (
    <button
      style={{ background: autosubmit() ? '#4CAF50' : '#f44336' }}
      onClick={() => toggleAutosubmit()}
    >
      Autosubmit
    </button>
  )
}
