import { logger } from '../../utils/logger.js'
import { parseTimeStringToMs } from '../../utils/parse-time-to-ms.js'
import { randomMsOffset } from '../../utils/random-ms-offset.js'
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

  get currentTaskFields(): TaskFields | null {
    return this.taskFields
  }

  set currentTaskFields(taskFields: TaskFields | null) {
    this.taskFields = taskFields
  }

  get getTaskFields(): TaskFields | undefined {
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

    return {
      taskType: taskType.textContent!,
      requestId: requestId.textContent!,
      estimated: parseTimeStringToMs(estimatedRatingTime.textContent!.trim())
    }
  }

  get targetSelector(): string {
    return '.survey-meta-fields'
  }

  onChangeTask(callback: (taskFields: TaskFields) => void): void {
    this.onChangeTaskCallback = callback
  }

  observe(): void {
    const taskFields = this.getTaskFields
    if (!taskFields) return

    if (taskFields.requestId !== this.taskFields?.requestId) {
      const estimatedTimeOffset = randomMsOffset(taskFields.estimated)

      logger.info('Task fields changed', taskFields)
      this.onChangeTaskCallback!({
        ...taskFields,
        estimated: estimatedTimeOffset
      })

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

      this.currentTaskFields = taskFields
    }
  }
}

export const taskFieldsObserver = new TaskFieldsObserver()

taskFieldsObserver.onChangeTask((taskFields) => {
  timer.start(taskFields.estimated)
  stopwatch.start()
  updater.checkUpdates()
  survey.tryNotification()
})
