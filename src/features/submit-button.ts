import { createSignal } from 'solid-js'

import { logger } from '../utils/logger.js'
import { toggleAutoSubmit } from './widget/auto-submit-button.js'

const SUBMIT_BUTTON_SELECTOR = '.btn-success'
const SUBMIT_BUTTON_TEXT = 'Submit Rating'

const [autoSubmitting, setAutoSubmitting] = createSignal(true)

class SubmitButton {
  get isAutoSubmit(): boolean {
    return autoSubmitting()
  }

  toggleAutoSubmit(): void {
    setAutoSubmitting(!autoSubmitting())
  }

  private getSubmitButtons(): HTMLButtonElement[] {
    const buttons: HTMLButtonElement[] = []
    const elements = Array.from(
      document.querySelectorAll(SUBMIT_BUTTON_SELECTOR)
    )

    for (const element of elements) {
      if (!(element instanceof HTMLButtonElement)) continue
      if (element.textContent === SUBMIT_BUTTON_TEXT) {
        buttons.push(element)
      }
    }

    return buttons
  }

  clickSubmit(): void {
    if (!toggleAutoSubmit.isAutoSubmit) return

    const buttons = this.getSubmitButtons()
    if (!buttons.length) {
      logger.error('Submit button is not defined')
      return
    }

    buttons[0]!.click()
  }
}

export const submitButton = new SubmitButton()
