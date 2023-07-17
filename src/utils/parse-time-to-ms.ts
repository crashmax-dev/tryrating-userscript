import { logger } from './logger.js'

export function parseTimeStringToMs(timeString: string): number {
  // by karkar1ch1
  const times = timeString.split(/\s(?=\d)/)

  let ms = 0

  for (const time of times) {
    const [value, type] = time.split(' ')

    switch (type) {
      case 'hours':
        ms += Number(value) * 3600000
        break
      case 'minute':
      case 'minutes':
        ms += Number(value) * 60000
        break
      case 'second':
      case 'seconds':
        ms += Number(value) * 1000
        break
      default:
        logger.warn(`Unknown time type: ${type}`)
    }
  }

  return ms
}
