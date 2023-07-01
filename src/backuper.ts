import { el } from '@zero-dependency/dom'
import ms from 'ms'
import type { StorageTasks } from './storage.js'

export class Backuper {
  constructor(private readonly storage: StorageTasks) {}

  download(): void {
    const values = this.storage.read()
    if (!values.length) {
      alert('Нету данных для экспорта.')
      return
    }

    const currentDate = new Date()
    const dateFormat = new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'UTC',
      timeZoneName: 'short'
    })

    const table = el('table', { border: '1' })
    const caption = el('caption')

    const thead = el(
      'tr',
      el('th', 'Task Type'),
      el('th', 'Estimated Rating Time')
    )

    table.append(caption, thead)

    let sumEstimated = 0
    for (const { type, estimated } of values) {
      sumEstimated += estimated
      const tr = el(
        'tr',
        el('td', type),
        el('td', ms(estimated, { long: true }))
      )
      table.append(tr)
    }

    caption.textContent = `Tasks ${dateFormat.format(currentDate)} (${ms(
      sumEstimated,
      { long: true }
    )})`

    const blob = new Blob([table.outerHTML], {
      type: 'text/html'
    })

    const link = el('a', {
      href: URL.createObjectURL(blob),
      download: `tryrating-com-${currentDate.toISOString()}.html`
    })

    link.click()
  }
}
