import { observeElement } from '@zero-dependency/dom'
import { autoCloseModal } from './auto-close-modal.js'

export function setObserverElement(): void {
  const appRoot = document.querySelector('#app-root')!

  if (!appRoot) {
    throw new Error('App root not found')
  }

  observeElement(appRoot, (mutation) => {
    autoCloseModal()
  })
}
