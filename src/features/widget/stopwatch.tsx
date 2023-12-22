import { createMemo } from 'solid-js'
import type { Component } from 'solid-js'

import { msToTime } from '../../utils/ms-to-time.js'
import { stopwatch } from '../stopwatch.js'

export const Stopwatch: Component = () => {
  const currentStopwatch = createMemo(() => {
    return msToTime(stopwatch.time)
  })

  return <div>Stopwatch: {currentStopwatch()}</div>
}
