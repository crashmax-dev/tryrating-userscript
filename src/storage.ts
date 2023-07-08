import { createSignal } from 'solid-js'
import { STORAGE_KEY } from './constants.js'
import { currentDate } from './tz.js'

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

export const [taskList, setTaskList] = createSignal<Tasks[]>([])

export class StorageTasks {
  constructor() {
    this.read()
  }

  get taskList() {
    return taskList()
  }

  private read(): void {
    const tasks = GM_getValue(STORAGE_KEY, initialStorage())
    setTaskList(tasks)
  }

  reset(): void {
    setTaskList(initialStorage())
    GM_setValue(STORAGE_KEY, taskList())
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
    GM_setValue(STORAGE_KEY, taskList())
  }

  getTaskList(): Tasks {
    const date = currentDate()
    const findedTaskList = taskList().find((task) => task.date === date)
    if (!findedTaskList) {
      return initialStorage()[0]!
    }

    return findedTaskList
  }
}
