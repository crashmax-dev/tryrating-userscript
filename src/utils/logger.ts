import { entries } from '@zero-dependency/utils'

type LogType = 'info' | 'debug' | 'warn' | 'error'

const colors: Record<LogType, string> = {
  info: `#2ecc71`,
  debug: `#7f8c8d`,
  warn: `#f39c12`,
  error: `#c0392b`
}

function styles(method: LogType) {
  return [
    `background: ${colors[method]}`,
    `border-radius: 0.5em`,
    `color: white`,
    `font-weight: bold`,
    `padding: 2px 0.5em`,
    'font-family: cursive'
  ].join(';')
}

export const logger = Object.freeze(
  entries(colors).reduce((acc, [method]) => {
    acc[method] = (...args) => {
      console[method](`%ctryrating-userscript`, styles(method), ...args)
    }

    return acc
  }, {} as Record<LogType, (...args: any[]) => void>)
)
