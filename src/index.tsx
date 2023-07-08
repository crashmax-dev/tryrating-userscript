import { observeElement } from '@zero-dependency/dom'
import dayjs from 'dayjs'
import { createMemo, createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import { Backuper } from './backuper.js'
import {
  closeModalValidationFailed,
  millisToMinutesAndSeconds,
  parseTimeToMs
} from './helpers.js'
import { Stopwatch } from './stopwatch.js'
import { StorageTasks } from './storage.js'
import { useSubmitButtons } from './submit-buttons.js'
import { TaskFieldsWatcher } from './task-fields.js'
import { Timer } from './timer.js'
import type { TaskFields } from './task-fields.js'
import type { Component } from 'solid-js'
import './styles.css'
import { setInterval } from 'worker-timers'

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

const stopwatch = new Stopwatch()

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

  // start timer and stopwatch
  const taskTime = parseTimeToMs(newTaskFields.estimatedRatingTime)
  timer.start(taskTime)
  stopwatch.start()
})

const appRoot = document.querySelector('#app-root')!

observeElement(appRoot, (mutation) => {
  closeModalValidationFailed()
})

setInterval(() => {
  taskFieldsWatcher.watch()
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
  const currentTimer = createMemo(() => {
    return millisToMinutesAndSeconds(timer.time)
  })

  const currentStopwatch = createMemo(() => {
    return millisToMinutesAndSeconds(stopwatch.time)
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
      <div>Timer: {currentTimer()}</div>
      <div>Stopwatch: {currentStopwatch()}</div>
      <div>Tasks: {currentTaskList()}</div>
    </div>
  )
}

render(() => <App />, document.body)
