import { entries } from '@zero-dependency/utils'

type LogType = 'debug' | 'log' | 'warn' | 'error'

const colors: Record<LogType, string> = {
  debug: `#7f8c8d`,
  log: `#2ecc71`,
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
