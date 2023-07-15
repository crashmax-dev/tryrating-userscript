import { logger } from '../../utils/logger.js'
import { parseTimeToMs } from '../../utils/parse-time-to-ms.js'
import { storage } from '../storage.js'
import { toggleAutoSubmit } from '../widget/auto-submit-button.jsx'

interface TaskFields {
  taskType: string
  requestId: string
  estimatedRatingTime: string
}

class TaskFieldsObserver {
  private taskFields: TaskFields | null = null
  private onChangeTaskCallback: ((taskFields: TaskFields) => void) | null = null

  get targetSelector() {
    return '.survey-meta-fields'
  }

  onChangeTask(callback: (taskFields: TaskFields) => void): void {
    this.onChangeTaskCallback = callback
  }

  observe(): void {
    const taskFields = document.querySelector(this.targetSelector)
    if (!taskFields) {
      logger.error('Task fields not found')
      return
    }

    const fieldsAttributes = Array.from(
      taskFields.querySelectorAll('.labeled-attribute__attribute')
    )
    if (!fieldsAttributes.length) {
      logger.error('Task fields attributes not found')
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
      logger.info('Task fields changed', newTaskFields)
      this.onChangeTaskCallback!(newTaskFields)

      if (!toggleAutoSubmit.isAutoSubmit) {
        toggleAutoSubmit.toggle()
      }

      if (this.taskFields) {
        logger.info('Task is submitted', this.taskFields)
        storage.write({
          type: this.taskFields.taskType,
          estimated: parseTimeToMs(this.taskFields.estimatedRatingTime)
        })
      }

      this.taskFields = newTaskFields
    }
  }
}

export const taskFieldsObserver = new TaskFieldsObserver()
