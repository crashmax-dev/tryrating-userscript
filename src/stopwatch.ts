import { createSignal } from 'solid-js'
import { clearInterval, setInterval } from 'worker-timers'

const [time, setTime] = createSignal(0)

export class Stopwatch {
  private intervalId: number

  get time() {
    return time()
  }

  private tick(): void {
    setTime((prevTime) => prevTime + 1000)
  }

  start(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      setTime(0)
    }

    this.intervalId = setInterval(() => this.tick(), 1000)
  }
}
