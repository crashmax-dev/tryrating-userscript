import { createSignal } from 'solid-js'
import { currentDate } from '../utils/current-date.js'
import { logger } from '../utils/logger.js'

interface TaskList {
  type: string
  count: number
  estimated: number
}

interface Tasks {
  date: string
  total: number
  list: TaskList[]
}

const initialStorage = (): Tasks[] => [
  {
    date: currentDate(),
    total: 0,
    list: []
  }
]

const [taskList, setTaskList] = createSignal<Tasks[]>([])

class Storage {
  private readonly STORAGE_KEY = 'tryrating-storage-v2'

  constructor() {
    this.read()
  }

  get taskList() {
    return taskList()
  }

  private read(): void {
    const tasks = GM_getValue(this.STORAGE_KEY, initialStorage())
    logger.info('Readed tasks', tasks)
    setTaskList(tasks)
  }

  reset(): void {
    setTaskList(initialStorage())
    GM_setValue(this.STORAGE_KEY, taskList())
  }

  write(newTask: Omit<TaskList, 'count'>): void {
    const currentTaskList = this.getTaskList()
    currentTaskList.total += 1

    const currentTask = currentTaskList.list.find(
      (task) => task.type === newTask.type
    )

    if (currentTask) {
      currentTask.count += 1
      currentTask.estimated += newTask.estimated
    } else {
      currentTaskList.list.push({
        count: 1,
        type: newTask.type,
        estimated: newTask.estimated
      })
    }

    const newTaskList = [
      currentTaskList,
      ...taskList().filter((task) => task.date !== currentTaskList.date)
    ]

    setTaskList(newTaskList)
    GM_setValue(this.STORAGE_KEY, taskList())
  }

  getTaskList(): Tasks {
    const date = currentDate()
    logger.info('Current date', date)

    const findedTaskList = taskList().find((task) => task.date === date)
    logger.info('Task list', findedTaskList)

    if (!findedTaskList) {
      return initialStorage()[0]!
    }

    return findedTaskList
  }
}

export const storage = new Storage()
