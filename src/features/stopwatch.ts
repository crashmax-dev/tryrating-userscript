import { createSignal } from 'solid-js'
import { clearInterval, setInterval } from 'worker-timers'

const [stopwatchTime, setStopwatchTime] = createSignal(0)

class Stopwatch {
  private intervalId: number

  get time() {
    return stopwatchTime()
  }

  private tick(): void {
    setStopwatchTime((prevTime) => prevTime + 1000)
  }

  start(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      setStopwatchTime(0)
    }

    this.intervalId = setInterval(() => this.tick(), 1000)
  }
}

export const stopwatch = new Stopwatch()
