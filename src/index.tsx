import { createMemo } from 'solid-js'
import { render } from 'solid-js/web'
import { setInterval } from 'worker-timers'
import { Backuper } from './features/backuper.js'
import { setKeyboardListeners } from './features/keyboard-listeners.js'
import { setObserverElement } from './features/observe-elements.js'
import { Stopwatch } from './features/stopwatch.js'
import { Storage } from './features/storage.js'
import { useSubmitButtons } from './features/submit-buttons.js'
import { TaskFieldsObserve } from './features/task-fields-observe.js'
import { Timer } from './features/timer.js'
import {
  ToggleAutoSubmit,
  useToggleAutosubmit
} from './features/toggle-auto-submit.js'
import { currentDate } from './utils/current-date.js'
import { msToTimeString } from './utils/ms-to-time.js'
import { parseTimeToMs } from './utils/parse-time-to-ms.js'
import type { Component } from 'solid-js'
import './styles/widget.scss'

const { autosubmit } = useToggleAutosubmit()
const { findSubmitButtons } = useSubmitButtons()

const storage = new Storage()
const stopwatch = new Stopwatch()
const backuper = new Backuper(storage)

const timer = new Timer()
timer.onTimerEnd(() => {
  if (!autosubmit) return

  const buttons = findSubmitButtons()
  if (!buttons.length) {
    console.error('submitButtons is not defined')
    return
  }

  buttons[0]!.click()
})

const taskFieldsWatcher = new TaskFieldsObserve(storage)
taskFieldsWatcher.onChangeTask((taskFields) => {
  // force update signal
  void findSubmitButtons()

  // start timer and stopwatch
  const taskTime = parseTimeToMs(taskFields.estimatedRatingTime)
  timer.start(taskTime)
  stopwatch.start()
})

const App: Component = () => {
  const currentTimer = createMemo(() => {
    return msToTimeString(timer.time)
  })

  const currentStopwatch = createMemo(() => {
    return msToTimeString(stopwatch.time)
  })

  const currentTaskList = createMemo(() => {
    const date = currentDate()
    const findedTaskList = storage.taskList.find((task) => task.date === date)
    return findedTaskList?.total ?? '0'
  })

  return (
    <div class="tryrating-widget">
      <div>Timer: {currentTimer()}</div>
      <div>Stopwatch: {currentStopwatch()}</div>
      <div>Tasks: {currentTaskList()}</div>
      <ToggleAutoSubmit />
    </div>
  )
}

setKeyboardListeners(backuper, storage)
setObserverElement()
setInterval(() => taskFieldsWatcher.observe(), 5000)

render(() => <App />, document.body)
