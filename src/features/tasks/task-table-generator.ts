import { el } from '@zero-dependency/dom'
import { msToTimeFull } from '../../utils/ms-to-time.js'
import type { TaskList } from '../storage.js'

export class TaskTableGenerator {
  banner(date: string, total: number, totalEstimate: number) {
    return el(
      'div',
      {
        style: {
          display: 'flex',
          gap: '4px',
          flexDirection: 'column'
        }
      },
      el('span', `Date: ${date}`),
      el('span', `Tasks ${total}`),
      el('span', `Estimated time: ${msToTimeFull(totalEstimate)}`)
    )
  }

  static head() {
    return el(
      'tr',
      el('th', 'Task Type'),
      el('th', 'Count'),
      el('th', 'Estimated Rating Time')
    )
  }

  static tr(task: TaskList) {
    return el(
      'tr',
      el('td', task.type),
      el('td', `${task.count}`),
      el('td', msToTimeFull(task.estimated))
    )
  }
}
