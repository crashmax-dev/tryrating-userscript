import { parseTimeToMs } from '../utils/parse-time-to-ms.js'
import { storage } from './storage.js'
import { useToggleAutosubmit } from './toggle-auto-submit.jsx'

const SURVEY_META_SELECTOR = '.survey-meta-fields'
const SURVEY_FIELDS_SELECTOR = '.labeled-attribute__attribute'

const { autosubmit, toggleAutosubmit } = useToggleAutosubmit()

export interface TaskFields {
  taskType: string
  requestId: string
  estimatedRatingTime: string
}

export class TaskFieldsObserve {
  private taskFields: TaskFields | null = null
  private onChangeTaskCallback: ((taskFields: TaskFields) => void) | null = null

  onChangeTask(callback: (taskFields: TaskFields) => void): void {
    this.onChangeTaskCallback = callback
  }

  observe(): void {
    const taskFields = document.querySelector(SURVEY_META_SELECTOR)
    if (!taskFields) {
      console.error('Task fields not found')
      return
    }

    const fieldsAttributes = Array.from(
      taskFields.querySelectorAll(SURVEY_FIELDS_SELECTOR)
    )
    if (!fieldsAttributes.length) {
      console.error('Task fields attributes not found')
      return
    }

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

      if (!autosubmit) {
        toggleAutosubmit()
      }

      if (this.taskFields) {
        console.info('Current task is submitted:', this.taskFields)
        storage.write({
          type: this.taskFields.taskType,
          estimated: parseTimeToMs(this.taskFields.estimatedRatingTime)
        })
      }

      this.taskFields = newTaskFields
    }
  }
}
