import ms from 'ms'
import { clearInterval, setInterval } from 'worker-timers'

export class Timer {
  private intervalId: ReturnType<typeof setInterval> | null
  private ms: number = 0

  private onTickCallback: (time: string) => void
  private onEndCallback: () => void

  onTimerTick(callback: (time: string) => void): void {
    this.onTickCallback = callback
  }

  onTimerEnd(callback: () => void): void {
    this.onEndCallback = callback
  }

  private onTickTimer(): void {
    this.ms -= 1000
    const time = ms(this.ms, { long: true })
    this.onTickCallback(time)

    if (this.ms === 0) {
      this.onEndCallback()
      this.stop()
    }
  }

  start(ms: number): void {
    this.stop()
    this.ms = ms
    this.intervalId = setInterval(() => this.onTickTimer(), 1000)
  }

  stop(): void {
    if (!this.intervalId) return
    clearInterval(this.intervalId)
    this.intervalId = null
  }
}
