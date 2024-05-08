import { EVENT_KEYBOARD_SHORTCUTS } from '../constants.js'
import { storage } from './storage.js'
import { submitButton } from './submit-button.js'
import { taskBackuper } from './tasks/task-backuper.js'
import { toggleAutoSubmit } from './widget/auto-submit-button.jsx'
import { resetWidgetPosition } from './widget/widget-dnd.jsx'
import { toggleWidgetVisibility } from './widget/widget-visibility.jsx'

export function setKeyboardListeners(): void {
  window.addEventListener('keydown', (event) => {
    if (EVENT_KEYBOARD_SHORTCUTS.openTasks(event)) {
      event.preventDefault()
      taskBackuper.generate()
    }

    if (EVENT_KEYBOARD_SHORTCUTS.resetTasks(event)) {
      event.preventDefault()
      if (confirm('Reset data.\nAre you sure?')) {
        storage.reset()
      }
    }

    if (EVENT_KEYBOARD_SHORTCUTS.resetWidgetPosition(event)) {
      event.preventDefault()
      resetWidgetPosition()
    }

    if (EVENT_KEYBOARD_SHORTCUTS.toggleAutoSubmit(event)) {
      event.preventDefault()
      toggleAutoSubmit.toggle()
    }

    if (EVENT_KEYBOARD_SHORTCUTS.toggleWidgetVisibility(event)) {
      event.preventDefault()
      toggleWidgetVisibility()
    }

    if (EVENT_KEYBOARD_SHORTCUTS.clickSubmit(event)) {
      event.preventDefault()
      submitButton.getSubmitButton()?.click()
    }
  })
}
