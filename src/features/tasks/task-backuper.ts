import { el } from '@zero-dependency/dom'
import { currentDate } from '../../utils/current-date.js'
import { msToTime, msToTimeFull } from '../../utils/ms-to-time.js'
import { storage } from '../storage.js'
import saveBlob from './save-blob.js?raw'

class TaskBackuper {
  // TODO: #8
  generateMonthyExport(): void {}

  openPage(): void {
    const values = storage.taskList
    if (!values.length) {
      alert('Нету данных для просмотра.')
      return
    }

    const page = el('div')
    let totalTasks = 0

    for (const { date, list, total } of values) {
      totalTasks += total
      let totalEstimate = 0

      const table = el('table', { border: '1' })
      const info = el('div', {
        style: {
          display: 'flex',
          gap: '4px',
          flexDirection: 'column'
        }
      })
      const thead = el(
        'tr',
        el('th', 'Task Type'),
        el('th', 'Count'),
        el('th', 'Estimated Rating Time')
      )

      table.append(info, thead)

      for (const { count, estimated, type } of list) {
        totalEstimate += estimated

        const tr = el(
          'tr',
          el('td', type),
          el('td', `${count}`),
          el('td', msToTime(estimated))
        )
        table.append(tr)
      }

      info.append(
        el('span', `Date: ${date}`),
        el('span', `Tasks ${total}`),
        el('span', `Estimated time: ${msToTimeFull(totalEstimate)}`)
      )

      page.append(el('div', table, el('hr')))
    }

    const pageScript = el(
      'script',
      saveBlob
        .replace('__DATE__', currentDate())
        .replace('__TOTAL_TASKS__', totalTasks.toString())
    )
    const savePageButton = el('button', 'Save')
    savePageButton.setAttribute('onclick', 'savePage()')
    page.append(pageScript)
    page.prepend(savePageButton)

    const blobPage = new Blob([page.outerHTML], {
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
