import { randomNum, sleep } from '@zero-dependency/utils'
import { createSignal } from 'solid-js'
import { NOTIFY_URL } from '../constants.js'
import { createLocalStore } from '../utils/create-local-storage.js'
import { logger } from '../utils/logger.js'

const [isCheckSurvey, setCheckSurvey] = createLocalStore('check-survey', {
  value: false
})
const [reloaded, setReloaded] = createSignal(false)

class SurveyCheck {
  checkSurvey(): void {
    if (reloaded()) return

    const noSurveyView = document.querySelector('.no-survey-view')
    if (!noSurveyView) return

    const checkNowButton = noSurveyView.querySelector('button')
    if (!checkNowButton) {
      logger.info('Check Now button is not defined')
      return
    }

    if (!isCheckSurvey.value) {
      logger.info('Survey is not found. Please, wait...')
      setCheckSurvey({ value: true })
    }

    setReloaded(true)
    sleep(10000)
      .then(() => checkNowButton.click())
      .finally(() => this.reloadPage())
  }

  tryNotification(): void {
    if (!isCheckSurvey.value) return
    setCheckSurvey({ value: false })

    GM_notification({
      title: 'Survey found!',
      text: 'Go to the survey',
      highlight: true,
      timeout: 3000
    })

    const audio = new Audio(NOTIFY_URL)
    audio.volume = 0.3
    audio.play()
  }

  private reloadPage(): void {
    const sleepMs = randomNum(30 * 1000, 60 * 1000)
    sleep(sleepMs).then(() => location.reload())
  }
}

export const survey = new SurveyCheck()
