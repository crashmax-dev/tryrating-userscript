import { el } from '@zero-dependency/dom'
import type { Storage } from './storage.js'

export class Ui {
  private timer: HTMLSpanElement
  private taskCounter: HTMLSpanElement

  constructor(private readonly storage: Storage) {}

  init(): void {
    const container = el('div', { className: 'tryrating-container' })
    this.taskCounter = el('span')
    this.timer = el('span')

    container.append(this.timer, this.taskCounter)
    document.body.appendChild(container)
    this.renderTaskCounter()
  }

  renderTime(time: string): void {
    this.timer.textContent = `Time: ${time}`
  }

  renderTaskCounter(): void {
    this.taskCounter.textContent = `Tasks: ${this.storage.values.length}`
  }
}
