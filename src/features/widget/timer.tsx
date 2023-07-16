import { createMemo } from 'solid-js'
import { msToTime } from '../../utils/ms-to-time.js'
import { timer } from '../timer.js'
import type { Component } from 'solid-js'

export const Timer: Component = () => {
  const currentTimer = createMemo(() => {
    return msToTime(timer.time)
  })

  return <div>Timer: {currentTimer()}</div>
}
