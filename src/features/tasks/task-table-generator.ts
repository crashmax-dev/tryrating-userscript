import { el } from '@zero-dependency/dom'

import { currentDate } from '../../utils/current-date.js'
import { msToTimeFull } from '../../utils/ms-to-time.js'
import saveBlobScript from './blob/save-blob.js?raw'
import blobPageStyles from './blob/styles.css?raw'
import type { TaskList } from '../storage.js'

export class TaskTableGenerator {
  static page() {
    const style = el('style', blobPageStyles)

    const script = el(
      'script',
      saveBlobScript.replace('__DATE__', currentDate())
    )

    const button = el('button', { className: 'save-button' }, 'Save')
    button.setAttribute('onclick', 'savePage()')

    return el('div', button, style, script)
  }

  static table() {
    return el('table')
  }

  static caption(date: string, total: number, estimated: number) {
    return el(
      'caption',
      el('p', `Date: ${date}`),
      el('p', `Tasks: ${total}`),
      el('p', `Estimated: ${msToTimeFull(estimated)}`)
    )
  }

  static head() {
    return el('tr', el('th', 'Task'), el('th', 'Count'), el('th', 'Estimated'))
  }

  static tr(task: TaskList) {
    return el(
      'tr',
      el('td', task.type),
      el('td', `${task.count}`),
      el('td', msToTimeFull(task.estimated))
    )
  }

  static open(page: HTMLElement) {
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
