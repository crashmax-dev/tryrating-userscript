import { render } from 'solid-js/web'
import { setKeyboardListeners } from './features/keyboard-listeners.js'
import { setObserverApp } from './features/observe-elements.js'
import { ToggleAutoCloseModalButton } from './features/widget/auto-close-modal-button.jsx'
import { ToggleAutoSubmitButton } from './features/widget/auto-submit-button.jsx'
import { OpenTaskPageButton } from './features/widget/open-tasks-page.jsx'
import { Stopwatch } from './features/widget/stopwatch.jsx'
import { Timer } from './features/widget/timer.jsx'
import { WidgetDraggableProvider } from './features/widget/widget-dnd.jsx'
import { WidgetVisibilityProvider } from './features/widget/widget-visibility.jsx'
import type { Component } from 'solid-js'
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
      </WidgetDraggableProvider>
    </WidgetVisibilityProvider>
  )
}

setObserverApp()
setKeyboardListeners()

render(() => <App />, document.body)
