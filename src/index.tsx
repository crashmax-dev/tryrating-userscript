import { createMemo } from 'solid-js'
import { render } from 'solid-js/web'
import { setInterval } from 'worker-timers'
import { setKeyboardListeners } from './features/keyboard-listeners.js'
import { setObserverElement } from './features/observe-elements.js'
import { stopwatch } from './features/stopwatch.js'
import { useSubmitButtons } from './features/submit-buttons.js'
import { TaskFieldsObserve } from './features/task-fields-observe.js'
import { TasksCountButton } from './features/tasks-viewer.jsx'
import { timer } from './features/timer.js'
import {
  ToggleAutoSubmitButton,
  useToggleAutosubmit
} from './features/toggle-auto-submit.jsx'
import { msToTimeString } from './utils/ms-to-time.js'
import { parseTimeToMs } from './utils/parse-time-to-ms.js'
import type { Component } from 'solid-js'
import './styles/widget.scss'

const { autosubmit } = useToggleAutosubmit()
const { findSubmitButtons } = useSubmitButtons()

timer.onTimerEnd(() => {
  if (!autosubmit) return

  const buttons = findSubmitButtons()
  if (!buttons.length) {
    console.error('submitButtons is not defined')
    return
  }

  buttons[0]!.click()
})

const taskFieldsWatcher = new TaskFieldsObserve()
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

  return (
    <div class="tryrating-widget">
      <div>Timer: {currentTimer()}</div>
      <div>Stopwatch: {currentStopwatch()}</div>
      <TasksCountButton />
      <ToggleAutoSubmitButton />
    </div>
  )
}

setKeyboardListeners()
setObserverElement()
setInterval(() => taskFieldsWatcher.observe(), 5000)

render(() => <App />, document.body)
