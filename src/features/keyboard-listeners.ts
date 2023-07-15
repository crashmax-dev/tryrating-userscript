import { storage } from './storage.js'
import { tasksViewer } from './tasks-viewer.js'
import { useToggleAutosubmit } from './toggle-auto-submit.jsx'
import { resetWidgetPosition } from './widget-dnd.jsx'
import { toggleWidgetVisibility } from './widget-visibility.jsx'

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

    // reset widget position
    if (event.altKey && event.key === '3') {
      event.preventDefault()
      resetWidgetPosition()
    }

    // toggle autosubmit
    if (event.ctrlKey && event.code === 'KeyO') {
      event.preventDefault()
      toggleAutosubmit()
    }

    // toggle widget visibility
    if (event.ctrlKey && event.code === 'KeyX') {
      event.preventDefault()
      toggleWidgetVisibility()
    }
  })
}
