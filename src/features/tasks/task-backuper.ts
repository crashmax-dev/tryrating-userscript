import { el } from '@zero-dependency/dom'

import { storage } from '../storage.js'
import { TaskTableGenerator } from './task-table-generator.js'

class TaskBackuper {
  private taskTableGenerator = new TaskTableGenerator()

  generate(): void {
    const { page, root } = this.taskTableGenerator.page()

    for (const { date, list, total, estimated } of storage.taskList) {
      const table = this.taskTableGenerator.table()
      const tbody = el('tbody')

      const caption = this.taskTableGenerator.caption(date, total, estimated)
      table.append(caption)

      const thead = this.taskTableGenerator.head()
      tbody.append(thead)

      for (const task of list) {
        const tr = this.taskTableGenerator.tr(task)
        tbody.append(tr)
      }

      table.append(tbody)
      root.prepend(table)
    }

    this.taskTableGenerator.insertData()
    this.taskTableGenerator.open(page)
  }
}

export const taskBackuper = new TaskBackuper()
