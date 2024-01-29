import { el } from '@zero-dependency/dom'

import { currentDate } from '../../utils/current-date.js'
import { msToTimeFull } from '../../utils/ms-to-time.js'
import blobPageScript from './blob/script.js?raw'
import blobPageStyles from './blob/styles.css?raw'
import type { TaskList, Tasks } from '../storage.js'

export class TaskTableGenerator {
  tasks: Tasks[]
  el: HTMLDivElement

  insertData() {
    this.el.prepend(
      el('script', `const tasks = ${JSON.stringify(this.tasks)};`)
    )
  }

  page() {
    this.tasks = []

    const root = el('div', { id: 'root', className: 'asc' })
    const styles = el('style', blobPageStyles)
    const script = el(
      'script',
      blobPageScript.replace('__CURRENT_DATE__', currentDate())
    )

    const buttons = el('div', { className: 'buttons' })
    const sortButton = el('button', { id: 'sort-button' }, 'Sort (ASC)')
    const daySortButton = el('button', { id: 'day-sort-button' }, 'Day Sort')
    const weekSortButton = el('button', { id: 'week-sort-button' }, 'Week Sort')
    const monthSortButton = el(
      'button',
      { id: 'month-sort-button' },
      'Month Sort'
    )
    const downloadButton = el('button', { id: 'download-button' }, 'Download')

    buttons.append(
      sortButton,
      daySortButton,
      weekSortButton,
      monthSortButton,
      downloadButton
    )

    this.el = el('div', styles, buttons, root, script)

    return {
      page: this.el,
      root
    }
  }

  table() {
    return el('table')
  }

  caption(date: string, total: number, estimated: number) {
    this.tasks.unshift({
      date,
      total,
      estimated,
      list: []
    })

    return el(
      'caption',
      el('p', `Date: ${date}`),
      el('p', `Tasks: ${total}`),
      el('p', `Estimated: ${msToTimeFull(estimated)}`)
    )
  }

  head() {
    return el('tr', el('th', 'Task'), el('th', 'Count'), el('th', 'Estimated'))
  }

  tr(task: TaskList) {
    const tasks = this.tasks.at(0)
    if (tasks) {
      tasks.list.push(task)
    }

    return el(
      'tr',
      el('td', task.type),
      el('td', `${task.count}`),
      el('td', msToTimeFull(task.estimated))
    )
  }

  open(page: HTMLElement) {
    const blob = new Blob([page.outerHTML], {
      type: 'text/html'
    })

    const link = el('a', {
      target: '_blank',
      href: URL.createObjectURL(blob)
    })

    link.click()
  }
}
