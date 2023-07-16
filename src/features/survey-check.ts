import { randomNum, sleep } from '@zero-dependency/utils'
import { createSignal } from 'solid-js'
import { logger } from '../utils/logger.js'

const [reloaded, setReloaded] = createSignal(false)

export function surveyCheck(): void {
  if (reloaded()) return

  const noSurveyView = document.querySelector('.no-survey-view')
  if (!noSurveyView) return

  const checkNowButton = noSurveyView.querySelector('button')
  if (!checkNowButton) {
    logger.info('Check Now button is not defined')
    return
  }

  setReloaded(true)

  sleep(5000)
    .then(() => checkNowButton.click())
    .finally(() => reloadPage())
}

function reloadPage(): void {
  const sleepMs = randomNum(5 * 1000, 10 * 1000)
  sleep(sleepMs).then(() => location.reload())
}
