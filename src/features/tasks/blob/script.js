const root = document.querySelector('#root')
const daySortButton = document.querySelector('#day-sort-button')
const weekSortButton = document.querySelector('#week-sort-button')
const monthSortButton = document.querySelector('#month-sort-button')
const sortButton = document.querySelector('#sort-button')
const downloadButton = document.querySelector('#download-button')

daySortButton.addEventListener('click', () => sortTable('day'))
weekSortButton.addEventListener('click', () => sortTable('week'))
monthSortButton.addEventListener('click', () => sortTable('month'))
sortButton.addEventListener('click', () => sortTable('desc'))

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
  if (type === 'desc') {
    root.classList.toggle('desc')

    if (root.classList.contains('desc')) {
      sortButton.textContent = 'Sort (DESC)'
    } else {
      sortButton.textContent = 'Sort (ASC)'
    }
  }

  if (type === 'day') {
    createTable('day')
  }

  if (type === 'week') {
    createTable('week')
  }

  if (type === 'month') {
    createTable('month')
  }
}

function createTableHead() {
  return el('tr', el('th', 'Task'), el('th', 'Count'), el('th', 'Estimated'))
}

function createTableCaption(task) {
  return el(
    'caption',
    el('p', `Date: ${task.date}`),
    el('p', `Tasks: ${task.total}`),
    el('p', `Estimated: ${msToTimeFull(task.estimated)}`)
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

function createTable(sortType) {
  root.innerHTML = ''

  function initTableData() {
    return {
      table: el('table'),
      tbody: el('tbody'),
      day: 0,
      date: '',
      total: 0,
      estimated: 0,
      list: []
    }
  }

  function pushTable(date) {
    tableData.table.append(
      createTableCaption({
        date: `${tableData.date} - ${date} (${tableData.day - 1} days)`,
        total: tableData.total,
        estimated: tableData.estimated
      })
    )
    tableData.tbody.append(createTableHead(), ...tableData.list)
    tableData.table.append(tableData.tbody)
    root.prepend(tableData.table)
    tableData = initTableData()
  }

  let tableData = initTableData()
  const daysBySortType = sortType === 'week' ? 7 : 30

  for (const { date, list, total, estimated } of tasks) {
    if (sortType === 'day') {
      createTableAllGroup({ date, list, total, estimated })
      continue
    }

    if (sortType === 'week' || sortType === 'month') {
      tableData.day++
      if (tableData.day > daysBySortType) {
        pushTable(date)
        tableData.day = 1
      }

      if (!tableData.date) tableData.date = date
      tableData.total += total
      tableData.estimated += estimated

      for (const task of list) {
        const tr = createTableTr(task)
        tableData.list.push(tr)
      }
    }
  }

  if (sortType === 'week' && tableData.list.length) {
    pushTable(tasks.at(-1).date)
  }
}

function createTableAllGroup(task) {
  const table = el('table')
  const tbody = el('tbody')

  const caption = createTableCaption(task)
  table.append(caption)

  const thead = createTableHead()
  tbody.append(thead)

  for (const currentTask of task.list) {
    const tr = createTableTr(currentTask)
    tbody.append(tr)
  }

  table.append(tbody)
  root.append(table)
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
