import fs from 'node:fs/promises'
import path from 'node:path'
import { addZero, randomNum, randomToken } from '@zero-dependency/utils'

function* dateGenerator() {
  for (let i = 1; i < 31; i++) {
    yield `${addZero(i)}.12.2023`
  }
}

const date = dateGenerator()

const tasks = Array.from({ length: 30 }, () => {
  const list = Array.from({ length: 10 }, () => {
    return {
      type: `task-${randomToken()}`,
      count: randomNum(5, 15),
      estimated: randomNum(5 * 5000, 120 * 1000)
    }
  })

  const total = list.reduce((acc, task) => acc + task.count, 0)
  const estimated = list.reduce((acc, task) => acc + task.estimated, 0)

  return {
    date: date.next().value,
    total,
    estimated,
    list
  }
})

const __dirname = path.dirname(new URL(import.meta.url).pathname)

await fs.writeFile(
  path.join(__dirname, '..', 'mock', 'tasks.json'),
  JSON.stringify(tasks, null, 2),
  { encoding: 'utf-8' }
)
