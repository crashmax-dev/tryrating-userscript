import { createSignal } from 'solid-js'
import { STORAGE_KEY } from './constants.js'

interface Task {
  type: string
  estimated: number
}

export const [tasks, setTasks] = createSignal<Task[]>([])

export class StorageTasks {
  constructor() {
    this.read()
    console.log('tasks', tasks())
  }

  get values() {
    return tasks()
  }

  reset(): void {
    setTasks([])
    GM_setValue(STORAGE_KEY, tasks())
  }

  read(): Task[] {
    const tasks = GM_getValue<Task[]>(STORAGE_KEY, [])
    setTasks(tasks)
    return tasks
  }

  write(task: Task) {
    setTasks((prevValue) => [...prevValue, task])
    GM_setValue(STORAGE_KEY, tasks())
  }
}
