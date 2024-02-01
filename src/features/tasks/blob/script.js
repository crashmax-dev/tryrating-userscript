const root = document.querySelector('#root')
const sortButton = document.querySelector('#sort-button')
const toggleTablesButton = document.querySelector('#toggle-tables-button')
const daySortButton = document.querySelector('#day-sort-button')
const weekSortButton = document.querySelector('#week-sort-button')
const monthSortButton = document.querySelector('#month-sort-button')
const downloadButton = document.querySelector('#download-button')

const SortType = {
  // по возрастанию
  Asc: 'asc',
  // по убыванию
  Desc: 'desc',
  Day: 'day',
  Week: 'week',
  Month: 'month'
}

const PageState = {
  tablesOpen: false
}

sortButton.addEventListener('click', () => sortTable(SortType.Desc))
toggleTablesButton.addEventListener('click', () => toggleTables())
daySortButton.addEventListener('click', () => sortTable(SortType.Day))
weekSortButton.addEventListener('click', () => sortTable(SortType.Week))
monthSortButton.addEventListener('click', () => sortTable(SortType.Month))
document.addEventListener('DOMContentLoaded', () => createTable(SortType.Day))

// https://github.com/zero-dependency/dom/blob/17c3739f94515d14283d3a3377a80147aaa8378f/src/html.ts
function el(tag, props, ...children) {
  const el = document.createElement(tag)

  if (props instanceof Node) {
    el.append(props)
  } else if (typeof props === 'string') {
    el.append(text(props))
  } else if (Array.isArray(props)) {
    el.append(...props)
  } else {
    Object.assign(el, props)
    Object.assign(el.style, props?.style)
  }

  el.append(...children)

  return el
}

function text(text) {
  return document.createTextNode(text)
}

function addZero(i) {
  if (i < 10) i = `0${i}`
  return i
}

function msToSeconds(ms) {
  return addZero(Number(((ms % 60000) / 1000).toFixed(0)))
}

function msToTime(ms) {
  const minutes = addZero(Math.floor(ms / 60000))
  const seconds = msToSeconds(ms)
  return `${minutes}:${seconds}`
}

function msToTimeFull(ms) {
  const hours = addZero(Math.floor(ms / 3600000))
  const minutes = addZero(Math.floor((ms % 3600000) / 60000))
  const seconds = msToSeconds(ms)
  return `${hours}:${minutes}:${seconds}`
}

function sortTable(type) {
  // asc / desc
  if (type === SortType.Desc) {
    root.classList.toggle(SortType.Desc)

    if (root.classList.contains(SortType.Desc)) {
      sortButton.textContent = 'Сортировать по убыванию'
    } else {
      sortButton.textContent = 'Сортировать по возрастанию'
    }

    return
  }

  // day / week / month
  createTable(type)
}

function createTableHead() {
  return el('tr', el('th', 'Тип'), el('th', 'Количество'), el('th', 'Время'))
}

function createTableCaption(task) {
  return el(
    'caption',
    el('p', `Дата: ${task.date}`),
    el('p', `Количество: ${task.total}`),
    el('p', `Время: ${msToTimeFull(task.estimated)}`)
  )
}

function createTableTr(task) {
  return el(
    'tr',
    el('td', task.type),
    el('td', `${task.count}`),
    el('td', msToTimeFull(task.estimated))
  )
}

function toggleTables() {
  const details = root.querySelectorAll('details')
  PageState.tablesOpen = !PageState.tablesOpen
  toggleTablesButton.textContent = `${
    PageState.tablesOpen ? 'Скрыть' : 'Показать'
  } таблицы`
  for (const detail of details) {
    detail.open = PageState.tablesOpen
  }
}

class TableState {
  constructor() {
    this.initState()
  }

  initState() {
    this.data = {
      table: el('table'),
      days: 0,
      date: '',
      total: 0,
      estimated: 0,
      list: []
    }
  }

  pushTable(latestData) {
    const caption = createTableCaption({
      date: `${this.data.date} - ${latestData} (${this.data.days - 1} days)`,
      total: this.data.total,
      estimated: this.data.estimated
    })
    const details = el('details', el('summary', caption))
    this.data.table.append(createTableHead(), ...this.data.list)
    details.append(this.data.table)
    root.prepend(details)
    this.initState()
  }
}

function createTable(sortingType) {
  root.innerHTML = ''

  const tableState = new TableState()
  const isDaysSort = sortingType === SortType.Day
  const isWeeksSort = sortingType === SortType.Week
  const countDaysBySort = isWeeksSort ? 7 : 30
  const isNotDaysSort = [SortType.Week, SortType.Month].includes(sortingType)

  for (const { date, list, total, estimated } of tasks) {
    if (isDaysSort) {
      createTableAllGroup({ date, list, total, estimated })
      continue
    }

    if (isNotDaysSort) {
      tableState.data.days++
      if (tableState.data.days > countDaysBySort) {
        tableState.pushTable(date)
        tableState.data.days = 1
      }

      tableState.data.date ||= date
      tableState.data.total += total
      tableState.data.estimated += estimated

      for (const task of list) {
        const tr = createTableTr(task)
        tableState.data.list.push(tr)
      }
    }
  }

  if (isNotDaysSort && tableState.data.list.length) {
    tableState.pushTable(tasks.at(-1).date)
  }
}

function createTableAllGroup(task) {
  const table = el('table')
  const details = el('details', el('summary', createTableCaption(task)))

  const thead = createTableHead()
  table.append(thead)

  for (const currentTask of task.list) {
    const tr = createTableTr(currentTask)
    table.append(tr)
  }

  details.append(table)
  root.prepend(details)
}

downloadButton.addEventListener('click', () => {
  const body = document.body.cloneNode(true)
  body.querySelector('button')?.remove()
  body.querySelector('script')?.remove()

  const blob = new Blob([body.outerHTML], {
    type: 'text/html'
  })

  const link = document.createElement('a')
  Object.assign(link, {
    target: '_blank',
    href: URL.createObjectURL(blob),
    download: 'tryrating-__CURRENT_DATE__.html'
  })

  link.click()
})
