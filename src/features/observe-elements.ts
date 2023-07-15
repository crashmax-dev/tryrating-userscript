import { observeElement, waitElement } from '@zero-dependency/dom'
import { setInterval } from 'worker-timers'
import { logger } from '../utils/logger.js'
import { closeModal } from './close-modal.js'
import { taskFieldsObserver } from './tasks/task-fields-observer.js'

export async function setObserverApp(): Promise<void> {
  const appRoot = document.querySelector('#app-root')!

  if (!appRoot) {
    logger.error('App root not found')
    return
  }

  observeElement(appRoot, () => {
    if (closeModal.autoClose) {
      closeModal.closeValidationFailed()
    }
  })

  waitElement(taskFieldsObserver.targetSelector)
    .then(() => {
      setInterval(() => taskFieldsObserver.observe(), 5000)
    })
    .finally(() => logger.info('Initialized task fields observer'))
}
