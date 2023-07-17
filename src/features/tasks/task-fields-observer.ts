import { logger } from '../../utils/logger.js'
import { parseTimeStringToMs } from '../../utils/parse-time-to-ms.js'
import { stopwatch } from '../stopwatch.js'
import { storage } from '../storage.js'
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

    if (taskType.textContent !== this.taskFields?.requestId) {
      const estimatedTime = this.getRandomEstimatedOffset(
        estimatedRatingTime.textContent!.trim()
      )

      const newTaskFields = {
        taskType: taskType.textContent!,
        requestId: requestId.textContent!,
        estimated: estimatedTime
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
          estimated: this.taskFields.estimated
        })
      }

      this.taskFields = newTaskFields
    }
  }

  private getRandomEstimatedOffset(timeString: string): number {
    const milliseconds = parseTimeStringToMs(timeString)
    const randomPercent = Math.random() * (0.15 - -0.05) + -0.05
    return milliseconds + milliseconds * randomPercent
  }
}

export const taskFieldsObserver = new TaskFieldsObserver()

taskFieldsObserver.onChangeTask((taskFields) => {
  timer.start(taskFields.estimated)
  stopwatch.start()
  updater.checkUpdates()
})
