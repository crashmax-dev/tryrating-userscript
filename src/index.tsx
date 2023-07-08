import { observeElement } from '@zero-dependency/dom'
import dayjs from 'dayjs'
import { createMemo, createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import { setInterval } from 'worker-timers'
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
import { currentDate } from './tz.js'

const [autosubmit, setAutosubmit] = createSignal(true)

function toggleAutosubmit() {
  setAutosubmit(!autosubmit())
}

const { findSubmitButtons } = useSubmitButtons()
const [taskFields, setTaskFields] = createSignal<TaskFields | null>(null)

const storageTasks = new StorageTasks()
const backuper = new Backuper(storageTasks)

const timer = new Timer()
timer.onTimerEnd(() => {
  if (!autosubmit()) return

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
    if (!autosubmit()) {
      toggleAutosubmit()
    }

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

  // toggle autosubmit
  if (event.ctrlKey && event.code === 'KeyO') {
    event.preventDefault()
    toggleAutosubmit()
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
    const date = currentDate()
    const findedTaskList = storageTasks.taskList.find(
      (task) => task.date === date
    )
    return findedTaskList?.total ?? '0'
  })

  return (
    <div class="tryrating-container">
      <div>Timer: {currentTimer()}</div>
      <div>Stopwatch: {currentStopwatch()}</div>
      <div>Tasks: {currentTaskList()}</div>
      <button
        style={{ background: autosubmit() ? '#4CAF50' : '#f44336' }}
        onClick={() => toggleAutosubmit()}
      >
        Autosubmit
      </button>
    </div>
  )
}

render(() => <App />, document.body)
