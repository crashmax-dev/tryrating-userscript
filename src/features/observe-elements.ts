import { observeElement, waitElement } from '@zero-dependency/dom'
import { setInterval } from 'worker-timers'
import { logger } from '../utils/logger.js'
import { closeModal } from './close-modal.js'
import { survey } from './survey-check.js'
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

    survey.checkSurvey()
  })

  waitElement({ selector: taskFieldsObserver.targetSelector })
    .then(() => {
      setInterval(() => taskFieldsObserver.observe(), 7 * 1000)
    })
    .finally(() => logger.info('Initialized task fields observer'))
}
