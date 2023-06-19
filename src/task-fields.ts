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

  onChangeTask(callback: (taskFields: TaskFields) => void): void {
    this.onChangeTaskCallback = callback
  }

  watch(): void {
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
