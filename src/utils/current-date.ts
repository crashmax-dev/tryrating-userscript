import dayjs from 'dayjs'
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(tz)

const timezone = {
  offset: 180,
  region: 'Asia',
  location: 'Kuwait'
}

export function currentDate(): string {
  const date = dayjs.tz(new Date(), `${timezone.region}/${timezone.location}`)
  return date.format('DD.MM.YYYY')
}
