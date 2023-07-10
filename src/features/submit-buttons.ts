import { createSignal } from 'solid-js'

const SUBMIT_BUTTON_SELECTOR = '.btn-success'
const SUBMIT_BUTTON_TEXT = 'Submit Rating'

const [submitButtons, setSubmitButtons] = createSignal<HTMLButtonElement[]>([])

function findSubmitButtons(): HTMLButtonElement[] {
  const buttons: HTMLButtonElement[] = []
  const elements = Array.from(document.querySelectorAll(SUBMIT_BUTTON_SELECTOR))

  for (const element of elements) {
    if (!(element instanceof HTMLButtonElement)) continue
    if (element.textContent === SUBMIT_BUTTON_TEXT) {
      buttons.push(element)
    }
  }

  setSubmitButtons(buttons)
  return buttons
}

export function useSubmitButtons() {
  return {
    findSubmitButtons,
    get submitButtons() {
      return submitButtons()
    }
  }
}
