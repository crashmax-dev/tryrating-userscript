import { el } from '@zero-dependency/dom'
import ms from 'ms'
import { createMemo } from 'solid-js'
import { currentDate } from '../utils/current-date.js'
import { storage } from './storage.js'
import type { Component } from 'solid-js'

class TasksViewer {
  open(): void {
    const values = storage.taskList
    if (!values.length) {
      alert('Нету данных для просмотра.')
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
      target: '_blank',
      href: URL.createObjectURL(blob)
    })

    link.click()
  }
}

export const tasksViewer = new TasksViewer()

export const TasksCountButton: Component = () => {
  const currentTaskList = createMemo(() => {
    const date = currentDate()
    const findedTaskList = storage.taskList.find((task) => task.date === date)
    return findedTaskList?.total ?? '0'
  })

  return (
    <button
      style={{ background: 'gray' }}
      onClick={() => tasksViewer.open()}
    >
      Tasks: {currentTaskList()}
    </button>
  )
}
