import { el } from '@zero-dependency/dom'
import ms from 'ms'
import type { Storage } from './storage.js'

export class Backuper {
  constructor(private readonly storage: Storage) {}

  download(): void {
    const values = this.storage.taskList
    if (!values.length) {
      alert('Нету данных для экспорта.')
      return
    }

    const page = el('div')

    for (const { date, list, total } of values) {
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
          el('td', ms(estimated, { long: true }))
        )
        table.append(tr)
      }

      info.append(
        el('span', `Date: ${date}`),
        el('span', `Tasks ${total}`),
        el('span', `Estimated time: ${ms(totalEstimate, { long: true })}`)
      )

      page.append(el('div', table, el('hr')))
    }

    const blob = new Blob([page.outerHTML], {
      type: 'text/html'
    })

    const link = el('a', {
      href: URL.createObjectURL(blob),
      download: `tryrating-com-${new Date().toISOString()}.html`
    })

    link.click()
  }
}
