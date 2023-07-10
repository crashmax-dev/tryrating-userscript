import ms from 'ms'

export function parseTimeToMs(time: string): number {
  const times = time
    // by karkar1ch1
    .split(/\s(?=\d)/)

  return times.reduce((acc, value) => {
    // @ts-ignore
    acc += ms(value)
    return acc
  }, 0)
}
