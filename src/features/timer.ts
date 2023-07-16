import { createSignal } from 'solid-js'
import { clearInterval, setInterval } from 'worker-timers'
import { submitButton } from './submit-button.js'

const [timerTime, setTimerTime] = createSignal(0)

class Timer {
  private intervalId: ReturnType<typeof setInterval> | null

  private onEndCallback: () => void

  private onTickTimer(): void {
    const newTime = timerTime() - 1000
    setTimerTime(newTime)

    if (newTime === 0) {
      this.onEndCallback()
      this.stop()
    }
  }

  get time() {
    return timerTime()
  }

  onTimerEnd(callback: () => void): void {
    this.onEndCallback = callback
  }

  start(ms: number): void {
    this.stop()
    setTimerTime(ms)
    this.intervalId = setInterval(() => this.onTickTimer(), 1000)
  }

  stop(): void {
    if (!this.intervalId) return
    clearInterval(this.intervalId)
    this.intervalId = null
  }
}

export const timer = new Timer()

timer.onTimerEnd(() => submitButton.clickSubmit())
