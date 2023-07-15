import dayjs from 'dayjs'
import { logger } from './logger.js'

export function parseTimeStringToMs(timeString: string): number {
  // by karkar1ch1
  const times = timeString.split(/\s(?=\d)/)

  let ms = 0

  for (const time of times) {
    const [value, type] = time.split(' ')

    switch (type) {
      case 'hours':
        ms += dayjs().hour(Number(value)).millisecond()
        break
      case 'minutes':
        ms += dayjs().minute(Number(value)).millisecond()
        break
      case 'seconds':
        ms += dayjs().second(Number(value)).millisecond()
        break
      default:
        logger.warn(`Unknown time type: ${type}`)
    }
  }

  return ms
}
