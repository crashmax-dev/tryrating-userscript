import { STORAGE_KEY } from './constants.js'

interface Task {
  type: string
  estimated: number
}

export class Storage {
  private values: Task[] = []

  constructor() {
    this.read()
    console.log('storage', this.values)
  }

  reset() {
    this.values = []
    GM_setValue(STORAGE_KEY, this.values)
  }

  read() {
    this.values = GM_getValue<Task[]>(STORAGE_KEY, [])
    return this.values
  }

  write(task: Task) {
    this.values.push(task)
    GM_setValue(STORAGE_KEY, this.values)
  }
}
