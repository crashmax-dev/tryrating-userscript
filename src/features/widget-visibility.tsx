import { createSignal, Show } from 'solid-js'
import type { FlowComponent } from 'solid-js'

const [widgetVisibility, setWidgetVisibility] = createSignal(true)

export function toggleWidgetVisibility() {
  setWidgetVisibility(!widgetVisibility())
}

export const WidgetVisibilityProvider: FlowComponent = (props) => {
  return <Show when={widgetVisibility()}>{props.children}</Show>
}
