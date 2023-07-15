import { createMemo } from 'solid-js'
import { render } from 'solid-js/web'
import { setKeyboardListeners } from './features/keyboard-listeners.js'
import { setObserverApp } from './features/observe-elements.js'
import { stopwatch } from './features/stopwatch.js'
import { submitButton } from './features/submit-button.js'
import { taskFieldsObserver } from './features/tasks/task-fields-observer.js'
import { timer } from './features/timer.js'
import { ToggleAutoCloseModalButton } from './features/widget/auto-close-modal-button.jsx'
import { ToggleAutoSubmitButton } from './features/widget/auto-submit-button.jsx'
import { OpenTaskPageButton } from './features/widget/open-tasks-page.jsx'
import { WidgetDraggableProvider } from './features/widget/widget-dnd.jsx'
import { WidgetVisibilityProvider } from './features/widget/widget-visibility.jsx'
import { msToTime } from './utils/ms-to-time.js'
import type { Component } from 'solid-js'
import './styles/widget.scss'

const App: Component = () => {
  timer.onTimerEnd(() => submitButton.clickSubmit())

  taskFieldsObserver.onChangeTask((taskFields) => {
    timer.start(taskFields.estimatedRatingTime)
    stopwatch.start()
  })

  const currentTimer = createMemo(() => {
    return msToTime(timer.time)
  })

  const currentStopwatch = createMemo(() => {
    return msToTime(stopwatch.time)
  })

  return (
    <WidgetVisibilityProvider>
      <WidgetDraggableProvider>
        <div class="tryrating-widget">
          <div>Timer: {currentTimer()}</div>
          <div>Stopwatch: {currentStopwatch()}</div>
          <OpenTaskPageButton />
          <ToggleAutoSubmitButton />
          <ToggleAutoCloseModalButton />
          <button onClick={() => {}}>Debug</button>
        </div>
      </WidgetDraggableProvider>
    </WidgetVisibilityProvider>
  )
}

setObserverApp()
setKeyboardListeners()

render(() => <App />, document.body)
