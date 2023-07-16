import { storage } from '../storage.js'
import { TaskTableGenerator } from './task-table-generator.js'

class TaskBackuper {
  // TODO: #8
  generateMonthyPage(): void {}

  generateDailyPage(): void {
    const page = TaskTableGenerator.page()

    for (const { date, list, total, estimated } of storage.taskList) {
      const table = TaskTableGenerator.table()

      const caption = TaskTableGenerator.caption(date, total, estimated)
      table.append(caption)

      const thead = TaskTableGenerator.head()
      table.append(thead)

      for (const task of list) {
        const tr = TaskTableGenerator.tr(task)
        table.append(tr)
      }

      page.prepend(table)
    }

    TaskTableGenerator.open(page)
  }
}

export const taskBackuper = new TaskBackuper()
