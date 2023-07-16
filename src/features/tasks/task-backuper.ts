import { el } from '@zero-dependency/dom'
import { currentDate } from '../../utils/current-date.js'
import { msToTime, msToTimeFull } from '../../utils/ms-to-time.js'
import { storage } from '../storage.js'
import blobScript from './blob/script.js?raw'
import blobStyles from './blob/styles.css?raw'

class TaskBackuper {
  // TODO: #8
  generateMonthyExport(): void {}

  openPage(): void {
    const values = storage.taskList
    if (!values.length) {
      alert('Нету данных для просмотра.')
      return
    }

    const container = el('div')

    for (const { date, list, total, estimated } of values) {
      const caption = el(
        'caption',
        el('p', `Date: ${date}`),
        el('p', `Tasks: ${total}`),
        el('p', `Estimated: ${msToTimeFull(estimated)}`)
      )

      const table = el('table', caption)

      const thead = el(
        'tr',
        el('th', 'Task'),
        el('th', 'Count'),
        el('th', 'Estimated')
      )

      table.append(thead)

      for (const { count, estimated, type } of list) {
        const tr = el(
          'tr',
          el('td', type),
          el('td', `${count}`),
          el('td', msToTime(estimated))
        )
        table.append(tr)
      }

      container.append(table)
    }

    const pageStyles = el('style', blobStyles)
    const pageScript = el(
      'script',
      blobScript.replace('__DATE__', currentDate())
    )
    const savePageButton = el('button', { className: 'save-button' }, 'Save')
    savePageButton.setAttribute('onclick', 'savePage()')
    container.append(pageStyles, pageScript)
    container.prepend(savePageButton)

    const blobPage = new Blob([container.outerHTML], {
      type: 'text/html'
    })

    const link = el('a', {
      target: '_blank',
      href: URL.createObjectURL(blobPage)
    })

    link.click()
  }
}

export const taskBackuper = new TaskBackuper()
