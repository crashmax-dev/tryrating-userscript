import { storage } from './storage.js'
import { taskBackuper } from './tasks/task-backuper.js'
import { toggleAutoSubmit } from './widget/auto-submit-button.jsx'
import { resetWidgetPosition } from './widget/widget-dnd.jsx'
import { toggleWidgetVisibility } from './widget/widget-visibility.jsx'

export function setKeyboardListeners(): void {
  window.addEventListener('keydown', (event) => {
    // open tasks
    if (event.altKey && event.key === '1') {
      event.preventDefault()
      taskBackuper.openPage()
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
      toggleAutoSubmit.toggle()
    }

    // toggle widget visibility
    if (event.ctrlKey && event.code === 'KeyX') {
      event.preventDefault()
      toggleWidgetVisibility()
    }
  })
}
