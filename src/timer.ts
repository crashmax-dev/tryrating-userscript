import { createSignal } from 'solid-js'
import { clearInterval, setInterval } from 'worker-timers'

const [time, setTime] = createSignal(0)

export class Timer {
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

  start(ms: number): void {
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
