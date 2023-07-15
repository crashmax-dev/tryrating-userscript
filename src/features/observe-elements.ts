import { observeElement, waitElement } from '@zero-dependency/dom'
import { logger } from '../utils/logger.js'
import { autoCloseModal } from './auto-close-modal.js'
import { taskFieldsObserver } from './task-fields-observer.js'

export async function setObserverApp(): Promise<void> {
  const appRoot = document.querySelector('#app-root')!

  if (!appRoot) {
    logger.error('App root not found')
    return
  }

  observeElement(appRoot, () => {
    autoCloseModal()
  })

  waitElement(taskFieldsObserver.targetSelector)
    .then((el) => {
      observeElement(el, () => {
        taskFieldsObserver.observe()
      })
    })
    .finally(() => {
      logger.log('Initialized task fields observer')
    })
}
