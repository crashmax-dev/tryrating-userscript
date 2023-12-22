import { render } from 'solid-js/web'
import type { Component } from 'solid-js'

import { setKeyboardListeners } from './features/keyboard-listeners.js'
import { setObserverApp } from './features/observe-elements.js'
import { ToggleAutoCloseModalButton } from './features/widget/auto-close-modal-button.jsx'
import { ToggleAutoSubmitButton } from './features/widget/auto-submit-button.jsx'
import { OpenTaskPageButton } from './features/widget/open-tasks-page.jsx'
import { QuestionMark } from './features/widget/question-mark.jsx'
import { Stopwatch } from './features/widget/stopwatch.jsx'
import { Timer } from './features/widget/timer.jsx'
import { WidgetDraggableProvider } from './features/widget/widget-dnd.jsx'
import { WidgetVisibilityProvider } from './features/widget/widget-visibility.jsx'

import './styles.scss'

const App: Component = () => {
  return (
    <WidgetVisibilityProvider>
      <WidgetDraggableProvider>
        <Timer />
        <Stopwatch />
        <OpenTaskPageButton />
        <ToggleAutoSubmitButton />
        <ToggleAutoCloseModalButton />
        <QuestionMark />
      </WidgetDraggableProvider>
    </WidgetVisibilityProvider>
  )
}

setObserverApp()
setKeyboardListeners()

render(() => <App />, document.body)
