import { setInterval } from 'worker-timers'
import { SURVEY_FIELDS, SURVEY_META } from './constants.js'

export interface TaskFields {
  taskType: string
  requestId: string
  estimatedRatingTime: string
}

export class TaskFieldsWatcher {
  private taskFields: TaskFields | null = null
  private onChangeTaskCallback: ((taskFields: TaskFields) => void) | null = null

  get values(): TaskFields | null {
    return this.taskFields
  }

  init(): void {
    setInterval(() => this.getTaskFields(), 5000)
  }

  onChangeTask(callback: (taskFields: TaskFields) => void): void {
    this.onChangeTaskCallback = callback
  }

  private getTaskFields(): void {
    const taskFields = document.querySelector(SURVEY_META)
    if (!taskFields) return

    const fieldsAttributes = Array.from(
      taskFields.querySelectorAll(SURVEY_FIELDS)
    )
    if (!fieldsAttributes.length) return

    const [
      taskType,
      requestId,
      estimatedRatingTime
    ] = fieldsAttributes

    const newTaskFields = {
      taskType: taskType!.textContent!,
      requestId: requestId!.textContent!,
      estimatedRatingTime: estimatedRatingTime!.textContent!.trim()
    }

    if (newTaskFields.requestId !== this.taskFields?.requestId) {
      this.onChangeTaskCallback!(newTaskFields)
    }

    this.taskFields = newTaskFields
  }
}
