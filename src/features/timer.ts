import { createSignal } from 'solid-js'
import { clearInterval, setInterval } from 'worker-timers'
import { logger } from '../utils/logger.js'
import { randomMsOffset } from '../utils/random-ms-offset.js'
import { submitButton } from './submit-button.js'
import { taskFieldsObserver } from './tasks/task-fields-observer.js'

const [timerTime, setTimerTime] = createSignal(0)

class Timer {
  private intervalId: ReturnType<typeof setInterval> | null

  private onTimerTickCallback: () => void
  private onEndCallback: () => void

  private tick(): void {
    const newTime = timerTime() - 1000
    setTimerTime(newTime)
    this.onTimerTickCallback()

    if (newTime === 0) {
      this.onEndCallback()
      this.stop()
    }
  }

  get time(): number {
    return timerTime()
  }

  onTimerEnd(callback: () => void): void {
    this.onEndCallback = callback
  }

  onTimerTick(callback: () => void): void {
    this.onTimerTickCallback = callback
  }

  start(ms: number): void {
    this.stop()
    setTimerTime(ms)
    this.intervalId = setInterval(() => this.tick(), 1000)
  }

  stop(): void {
    if (!this.intervalId) return
    clearInterval(this.intervalId)
    this.intervalId = null
  }
}

export const timer = new Timer()

timer.onTimerEnd(() => submitButton.clickSubmit())
timer.onTimerTick(() => {
  const taskFields = taskFieldsObserver.getTaskFields
  const currentTaskFields = taskFieldsObserver.currentTaskFields
  if (!taskFields || !currentTaskFields) return

  if (
    currentTaskFields.requestId === taskFields.requestId &&
    currentTaskFields.estimated !== taskFields.estimated
  ) {
    logger.info('Task estimated changed', {
      oldTaskFields: currentTaskFields,
      newTaskFields: taskFields
    })
    const ms = randomMsOffset(taskFields.estimated)
    timer.start(ms)
    taskFieldsObserver.currentTaskFields = taskFields
  }
})
