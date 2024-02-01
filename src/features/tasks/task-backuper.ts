import { TasksPageGenerator } from './task-table-generator.js'

class TaskBackuper {
  private taskTableGenerator = new TasksPageGenerator()

  generate(): void {
    const tasksPage = this.taskTableGenerator.createTasksPage()
    this.taskTableGenerator.savePage(tasksPage)
  }
}

export const taskBackuper = new TaskBackuper()
