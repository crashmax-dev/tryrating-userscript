import { el } from '@zero-dependency/dom'
import type { Storage } from './storage.js'

export class Ui {
  private timer: HTMLSpanElement
  private taskCounter: HTMLSpanElement

  constructor(private readonly storage: Storage) {}

  init(): void {
    const container = el('div', { className: 'tryrating-container' })
    this.taskCounter = el('span', `Tasks: ${this.storage.data.length}`)
    this.timer = el('span')

    container.append(this.timer, this.taskCounter)
    console.log(container)
    document.body.appendChild(container)
  }

  render(time: string): void {
    this.timer.textContent = `Time: ${time}`
  }
}
