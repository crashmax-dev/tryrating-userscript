import { observeElement, waitElement } from '@zero-dependency/dom'
import { setInterval } from 'worker-timers'
import { logger } from '../utils/logger.js'
import { autoCloseModal } from './auto-close-modal.jsx'
import { taskFieldsObserver } from './task-fields-observer.js'

export async function setObserverApp(): Promise<void> {
  const appRoot = document.querySelector('#app-root')!

  if (!appRoot) {
    logger.error('App root not found')
    return
  }

  observeElement(appRoot, () => autoCloseModal())

  waitElement(taskFieldsObserver.targetSelector)
    .then(() => {
      setInterval(() => taskFieldsObserver.observe(), 5000)
    })
    .finally(() => logger.info('Initialized task fields observer'))
}
