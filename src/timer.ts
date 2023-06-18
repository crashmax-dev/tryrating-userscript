import ms from 'ms'
import { clearInterval, setInterval } from 'worker-timers'

export class Timer {
  private intervalId: ReturnType<typeof setInterval> | null
  private ms: number = 0

  private onTick: (time: string) => void
  private onEnd: () => void

  onTimerTick(callback: (time: string) => void): void {
    this.onTick = callback
  }

  onTimerEnd(callback: () => void): void {
    this.onEnd = callback
  }

  private onTickTimer() {
    this.ms -= 1000
    const time = ms(this.ms, { long: true })
    this.onTick(time)

    if (this.ms === 0) {
      this.onEnd()
      this.stop()
    }
  }

  start(ms: number) {
    this.stop()
    this.ms = ms
    this.intervalId = setInterval(() => this.onTickTimer(), 1000)
  }

  stop() {
    if (!this.intervalId) return
    clearInterval(this.intervalId)
    this.intervalId = null
  }
}
