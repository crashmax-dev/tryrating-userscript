import { storage } from './storage.js'
import { tasksViewer } from './tasks-viewer.js'
import { useToggleAutosubmit } from './toggle-auto-submit.jsx'

const { toggleAutosubmit } = useToggleAutosubmit()

export function setKeyboardListeners(): void {
  window.addEventListener('keydown', (event) => {
    // open tasks
    if (event.altKey && event.key === '1') {
      event.preventDefault()
      tasksViewer.open()
    }

    // reset tasks
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
