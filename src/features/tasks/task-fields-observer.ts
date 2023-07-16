import { randomNum } from '@zero-dependency/utils'
import { logger } from '../../utils/logger.js'
import { parseTimeStringToMs } from '../../utils/parse-time-to-ms.js'
import { stopwatch } from '../stopwatch.js'
import { storage } from '../storage.js'
import { timer } from '../timer.js'
import { toggleAutoSubmit } from '../widget/auto-submit-button.jsx'

interface TaskFields {
  taskType: string
  requestId: string
  estimated: number
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

    // 5-15 seconds
    const estimatedTimeShift = randomNum(5 * 1000, 15 * 1000)
    const estimatedTime =
      parseTimeStringToMs(estimatedRatingTime!.textContent!.trim()) +
      estimatedTimeShift

    const newTaskFields = {
      taskType: taskType!.textContent!,
      requestId: requestId!.textContent!,
      estimated: estimatedTime
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
          estimated: this.taskFields.estimated
        })
      }

      this.taskFields = newTaskFields
    }
  }
}

export const taskFieldsObserver = new TaskFieldsObserver()

taskFieldsObserver.onChangeTask((taskFields) => {
  timer.start(taskFields.estimated)
  stopwatch.start()
})
