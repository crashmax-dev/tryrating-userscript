import { useToggleAutosubmit } from './toggle-auto-submit.jsx'
import type { Backuper } from './backuper.js'
import type { Storage } from './storage.js'

const { toggleAutosubmit } = useToggleAutosubmit()

export function setKeyboardListeners(
  backuper: Backuper,
  storage: Storage
): void {
  window.addEventListener('keydown', (event) => {
    // export
    if (event.altKey && event.key === '1') {
      event.preventDefault()
      backuper.download()
    }

    // reset
    if (event.altKey && event.key === '2') {
      event.preventDefault()
      if (confirm('Reset data.\nAre you sure?')) {
        storage.reset()
      }
    }

    // toggle autosubmit
    if (event.ctrlKey && event.code === 'KeyO') {
      event.preventDefault()
      toggleAutosubmit()
    }
  })
}
