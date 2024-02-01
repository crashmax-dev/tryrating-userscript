import { el } from '@zero-dependency/dom'

import { currentDate } from '../../utils/current-date.js'
import { storage } from '../storage.js'
import blobPageScript from './blob/script.js?raw'
import blobPageStyles from './blob/styles.css?raw'

export class TasksPageGenerator {
  createTasksPage() {
    const html = el('html')
    const htmlBody = el('body')
    const headHtml = el('head')
    html.append(headHtml, htmlBody)

    const metaCharset = el('meta')
    metaCharset.setAttribute('charset', 'utf-8')
    headHtml.append(metaCharset)

    const rootContainer = el('div', { id: 'root', className: 'desc' })
    const styles = el('style', blobPageStyles)
    const mainScript = el(
      'script',
      blobPageScript.replace('__CURRENT_DATE__', currentDate())
    )

    const buttons = el('div', { className: 'buttons' })
    const sortButton = el(
      'button',
      { id: 'sort-button' },
      'Сортировать по убыванию'
    )
    const toggleTablesButton = el(
      'button',
      { id: 'toggle-tables-button' },
      'Показать таблицы'
    )
    const daySortButton = el(
      'button',
      { id: 'day-sort-button' },
      'Сортировать по дням'
    )
    const weekSortButton = el(
      'button',
      { id: 'week-sort-button' },
      'Сортировать по неделям'
    )
    const monthSortButton = el(
      'button',
      { id: 'month-sort-button' },
      'Сортировать по месяцам'
    )
    const downloadButton = el(
      'button',
      { id: 'download-button' },
      'Скачать в HTML'
    )

    buttons.append(
      sortButton,
      toggleTablesButton,
      daySortButton,
      weekSortButton,
      monthSortButton,
      downloadButton
    )

    const scriptTasks = el(
      'script',
      `const tasks = ${JSON.stringify(storage.taskList)}`
    )
    headHtml.append(styles, scriptTasks)
    htmlBody.append(buttons, rootContainer, mainScript)

    return html
  }

  savePage(page: HTMLElement) {
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
