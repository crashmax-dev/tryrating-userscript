import { logger } from '../utils/logger.js'
import { toggleAutoSubmit } from './widget/auto-submit-button.js'

const SUBMIT_BUTTON_SELECTOR = '.btn-success'
const SUBMIT_BUTTON_TEXT = 'Submit Rating'

class SubmitButton {
  getSubmitButton(): HTMLButtonElement | null {
    const buttons = Array.from(
      document.querySelectorAll(SUBMIT_BUTTON_SELECTOR)
    )

    for (const button of buttons) {
      if (!(button instanceof HTMLButtonElement)) continue
      if (button.textContent === SUBMIT_BUTTON_TEXT) {
        return button
      }
    }

    return null
  }

  clickSubmit(): void {
    if (toggleAutoSubmit.isEnabled) return

    const submitButton = this.getSubmitButton()
    if (!submitButton) {
      logger.error('Submit button is not defined')
      return
    }

    submitButton.click()
  }
}

export const submitButton = new SubmitButton()
