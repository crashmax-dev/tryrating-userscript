import { createSignal } from 'solid-js'
import { SUBMIT_BUTTON } from './constants.js'

export function useSubmitButtons() {
  const [submitButtons, setSubmitButtons] = createSignal<HTMLButtonElement[]>(
    []
  )

  function findSubmitButtons(): HTMLButtonElement[] {
    const buttons: HTMLButtonElement[] = []
    const elements = Array.from(
      document.querySelectorAll(SUBMIT_BUTTON.selector)
    )

    for (const element of elements) {
      if (!(element instanceof HTMLButtonElement)) continue
      if (element.textContent === SUBMIT_BUTTON.text) {
        buttons.push(element)
      }
    }

    setSubmitButtons(buttons)
    return buttons
  }

  return {
    findSubmitButtons,
    get submitButtons() {
      return submitButtons()
    }
  }
}
