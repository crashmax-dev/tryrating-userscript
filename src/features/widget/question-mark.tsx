import type { Component } from 'solid-js'

import { EVENT_KEYBOARD_SHORTCUTS_HELP } from '../../constants.js'
import { tooltip } from '../../utils/tooltip.js'

export const QuestionMark: Component = () => {
  return (
    <div
      {...tooltip({
        label: EVENT_KEYBOARD_SHORTCUTS_HELP,
        position: 'left',
        size: 'large'
      })}
    >
      ?
    </div>
  )
}
