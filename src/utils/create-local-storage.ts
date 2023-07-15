import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'

export function createLocalStore<T extends object>(name: string, init: T) {
  const value = GM_getValue(name, init)
  const [state, setState] = createStore<T>(value)

  createEffect(() => GM_setValue(name, state))

  return [state, setState] as const
}
