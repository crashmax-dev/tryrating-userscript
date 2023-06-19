import { STORAGE_KEY } from './constants.js'

interface Task {
  type: string
  estimated: number
}

export class Storage {
  private tasks: Task[] = []

  constructor() {
    this.read()
    console.log('storage', this.tasks)
  }

  get values() {
    return this.tasks
  }

  reset(): void {
    this.tasks = []
    GM_setValue(STORAGE_KEY, this.tasks)
  }

  read(): Task[] {
    this.tasks = GM_getValue<Task[]>(STORAGE_KEY, [])
    return this.tasks
  }

  write(task: Task) {
    this.tasks.push(task)
    GM_setValue(STORAGE_KEY, this.tasks)
  }
}
