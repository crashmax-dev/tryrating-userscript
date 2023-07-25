import { randomNum } from '@zero-dependency/utils'
import { logger } from '../../utils/logger.js'
import { parseTimeStringToMs } from '../../utils/parse-time-to-ms.js'
import { stopwatch } from '../stopwatch.js'
import { storage } from '../storage.js'
import { survey } from '../survey-check.js'
import { timer } from '../timer.js'
import { updater } from '../updater.js'
import { toggleAutoSubmit } from '../widget/auto-submit-button.jsx'

interface TaskFields {
  taskType: string
  requestId: string
  estimated: number
}

class TaskFieldsObserver {
  private taskFields: TaskFields | null = null
  private onChangeTaskCallback: ((taskFields: TaskFields) => void) | null = null

  get targetSelector(): string {
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

    const [
      taskType,
      requestId,
      estimatedRatingTime
    ] = Array.from(taskFields.querySelectorAll('.labeled-attribute__attribute'))
    if (!taskType || !requestId || !estimatedRatingTime) {
      logger.error('Task fields attributes not found')
      return
    }

    if (requestId.textContent !== this.taskFields?.requestId) {
      const estimatedTime = parseTimeStringToMs(
        estimatedRatingTime.textContent!.trim()
      )
      const estimatedTimeOffset = this.getRandomEstimatedOffset(estimatedTime)

      const newTaskFields = {
        taskType: taskType.textContent!,
        requestId: requestId.textContent!,
        estimated: estimatedTimeOffset
      }

      logger.info('Task fields changed', newTaskFields)
      this.onChangeTaskCallback!(newTaskFields)

      if (!toggleAutoSubmit.isAutoSubmit) {
        toggleAutoSubmit.toggle()
      }

      if (this.taskFields) {
        logger.info('Task is submitted', this.taskFields)
        storage.write({
          type: this.taskFields.taskType,
          estimated: estimatedTime
        })
      }

      this.taskFields = newTaskFields
    }
  }

  private getRandomEstimatedOffset(ms: number): number {
    const randomOffset = randomNum(-5, 15) // -5/-15 seconds
    return ms + randomOffset * 1000
  }
}

export const taskFieldsObserver = new TaskFieldsObserver()

taskFieldsObserver.onChangeTask((taskFields) => {
  timer.start(taskFields.estimated)
  stopwatch.start()
  updater.checkUpdates()
  survey.tryNotification()
})
