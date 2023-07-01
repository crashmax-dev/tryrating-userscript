import dayjs from 'dayjs'
import ms from 'ms'
import { createMemo, createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import { setInterval } from 'worker-timers'
import { Backuper } from './backuper.js'
import { getModal, parseTimeToMs } from './helpers.js'
import { StorageTasks } from './storage.js'
import { useSubmitButtons } from './submit-buttons.js'
import { TaskFieldsWatcher } from './task-fields.js'
import { Timer } from './timer.js'
import type { TaskFields } from './task-fields.js'
import type { Component } from 'solid-js'
import './styles.css'

const { findSubmitButtons } = useSubmitButtons()
const [taskFields, setTaskFields] = createSignal<TaskFields | null>(null)

const storageTasks = new StorageTasks()
const backuper = new Backuper(storageTasks)

const timer = new Timer()
timer.onTimerEnd(async () => {
  const buttons = findSubmitButtons()
  if (!buttons.length) {
    console.error('submitButtons is not defined')
    return
  }

  buttons[0]?.click()
})

const taskFieldsWatcher = new TaskFieldsWatcher()
taskFieldsWatcher.onChangeTask((newTaskFields) => {
  const fields = taskFields()

  // write task fields
  if (fields && fields.requestId !== newTaskFields.requestId) {
    console.info('Current task is submitted:', fields)

    // write new task fields
    storageTasks.write({
      type: fields.taskType,
      estimated: parseTimeToMs(fields.estimatedRatingTime)
    })
  }

  setTaskFields(newTaskFields)
  findSubmitButtons()

  // start timer
  const taskTime = parseTimeToMs(newTaskFields.estimatedRatingTime)
  timer.start(taskTime)
})

setInterval(() => {
  taskFieldsWatcher.watch()

  if (getModal()) {
    GM_notification({
      title: 'Открылось модальное окно',
      highlight: true,
      silent: false,
      timeout: 5000
    })
  }
}, 5000)

window.addEventListener('keydown', (event) => {
  // export
  if (event.altKey && event.key === '1') {
    event.preventDefault()
    backuper.download()
  }

  // reset
  if (event.altKey && event.key === '2') {
    event.preventDefault()
    if (confirm('Reset data.\nAre you sure?')) {
      storageTasks.reset()
    }
  }
})

const App: Component = () => {
  const currentTime = createMemo(() => {
    return ms(timer.time, { long: true })
  })

  const currentTaskList = createMemo(() => {
    const currentDate = dayjs().format('DD.MM.YYYY')
    const findedTaskList = storageTasks.taskList.find(
      (task) => task.date === currentDate
    )
    return findedTaskList?.total ?? '0'
  })

  return (
    <div class="tryrating-container">
      <span class="counter">Time: {currentTime()}</span>
      <span class="timer">Tasks: {currentTaskList()}</span>
      <button onClick={() => storageTasks.reset()}>Reset</button>
      <button
        onClick={() => {
          storageTasks.write({
            type: 'haha',
            estimated: parseTimeToMs('5 seconds')
          })
        }}
      >
        haha
      </button>
      <button
        onClick={() => {
          storageTasks.write({
            type: 'hoho',
            estimated: parseTimeToMs('3 seconds')
          })
        }}
      >
        hoho
      </button>
    </div>
  )
}

render(() => <App />, document.body)
