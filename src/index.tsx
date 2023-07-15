import { createMemo } from 'solid-js'
import { render } from 'solid-js/web'
import { setKeyboardListeners } from './features/keyboard-listeners.js'
import { setObserverApp } from './features/observe-elements.js'
import { stopwatch } from './features/stopwatch.js'
import { getSubmitButtons } from './features/submit-buttons.js'
import { taskFieldsObserver } from './features/task-fields-observer.js'
import { TasksCountButton } from './features/tasks-viewer.jsx'
import { timer } from './features/timer.js'
import {
  createToggleAutosubmit,
  ToggleAutoSubmitButton
} from './features/toggle-auto-submit.jsx'
import { WidgetDraggableProvider } from './features/widget-dnd.jsx'
import { WidgetVisibilityProvider } from './features/widget-visibility.jsx'
import { logger } from './utils/logger.js'
import { msToTimeString } from './utils/ms-to-time.js'
import { parseTimeToMs } from './utils/parse-time-to-ms.js'
import type { Component } from 'solid-js'
import './styles/widget.scss'

const { autosubmit } = createToggleAutosubmit()

timer.onTimerEnd(() => {
  if (!autosubmit) return

  const buttons = getSubmitButtons()
  if (!buttons.length) {
    logger.error('Submit button is not defined')
    return
  }

  buttons[0]!.click()
})

taskFieldsObserver.onChangeTask((taskFields) => {
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
    <WidgetVisibilityProvider>
      <WidgetDraggableProvider>
        <div class="tryrating-widget">
          <div>Timer: {currentTimer()}</div>
          <div>Stopwatch: {currentStopwatch()}</div>
          <TasksCountButton />
          <ToggleAutoSubmitButton />
        </div>
      </WidgetDraggableProvider>
    </WidgetVisibilityProvider>
  )
}

setObserverApp()
setKeyboardListeners()

render(() => <App />, document.body)
