import { createSignal } from 'solid-js'
import { clearInterval, setInterval } from 'worker-timers'
import { parseTimeStringToMs } from '../utils/parse-time-to-ms.js'

const [time, setTime] = createSignal(0)

class Timer {
  private intervalId: ReturnType<typeof setInterval> | null

  private onEndCallback: () => void

  private onTickTimer(): void {
    const newTime = time() - 1000
    setTime(newTime)

    if (newTime === 0) {
      this.onEndCallback()
      this.stop()
    }
  }

  get time() {
    return time()
  }

  onTimerEnd(callback: () => void): void {
    this.onEndCallback = callback
  }

  start(estimatedTime: string): void {
    const ms = parseTimeStringToMs(estimatedTime)
    this.stop()
    setTime(ms)
    this.intervalId = setInterval(() => this.onTickTimer(), 1000)
  }

  stop(): void {
    if (!this.intervalId) return
    clearInterval(this.intervalId)
    this.intervalId = null
  }
}

export const timer = new Timer()
