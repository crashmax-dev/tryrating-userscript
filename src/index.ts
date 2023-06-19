import { sleep } from '@zero-dependency/utils'
import { Backuper } from './backuper.js'
import { getModal, getSubmitButtons, parseTimeToMs } from './helpers.js'
import { Storage } from './storage.js'
import { TaskFieldsWatcher } from './task-fields.js'
import { Timer } from './timer.js'
import { Ui } from './ui.js'
import type { TaskFields } from './task-fields.js'
import './styles.css'

class App {
  private backuper: Backuper
  private ui: Ui
  private timer: Timer
  private taskFieldsWatcher: TaskFieldsWatcher

  private submitted = false
  private submitButtons: HTMLButtonElement[] = []
  private taskFields: TaskFields | null = null

  private onSubmitEvent: () => void

  constructor(private readonly storage: Storage) {
    this.onSubmitEvent = this.writeSubmittedTask.bind(this)
  }

  init(): void {
    this.backuper = new Backuper(this.storage)

    this.ui = new Ui(this.storage)
    this.ui.init()

    this.timer = new Timer()
    this.timer.onTimerTick((time) => this.ui.renderTime(time))
    this.timer.onTimerEnd(async () => {
      if (!this.submitButtons.length) {
        console.error('submitButton is not defined')
        return
      }

      this.submitButtons[0]!.click()
      await sleep(1000)

      const modal = getModal()
      if (modal) {
        GM_notification({
          title: 'Открылось модальное окно',
          highlight: true,
          silent: false,
          timeout: 0
        })

        this.addSubmitListeners()
        return
      }

      this.writeSubmittedTask()
    })

    this.taskFieldsWatcher = new TaskFieldsWatcher()
    this.taskFieldsWatcher.init()
    this.taskFieldsWatcher.onChangeTask((taskFields) => {
      this.removeSubmitListeners()

      this.submitted = false
      this.taskFields = taskFields
      this.submitButtons = getSubmitButtons()

      const timerMs = parseTimeToMs(this.taskFields.estimatedRatingTime)
      this.timer.start(timerMs)
    })

    window.addEventListener('keydown', (event) => {
      // export
      if (event.altKey && event.key === '1') {
        event.preventDefault()
        this.backuper.download()
      }

      // reset
      if (event.altKey && event.key === '2') {
        event.preventDefault()
        if (confirm('Reset data.\nAre you sure?')) {
          this.storage.reset()
        }
      }
    })
  }

  writeSubmittedTask(): void {
    if (!this.taskFields) {
      console.error('taskFields is not defined')
      return
    }

    if (this.submitted) {
      console.info('current task is submitted', this.taskFields)
      return
    }

    this.submitted = true
    this.storage.write({
      type: this.taskFields.taskType,
      estimated: parseTimeToMs(this.taskFields.estimatedRatingTime)
    })
    this.ui.renderTaskCounter()
  }

  addSubmitListeners(): void {
    for (const submitButton of this.submitButtons) {
      submitButton.addEventListener('click', this.onSubmitEvent)
    }
  }

  removeSubmitListeners(): void {
    for (const submitButton of this.submitButtons) {
      submitButton.removeEventListener('click', this.onSubmitEvent)
    }
  }
}

const storage = new Storage()
const root = new App(storage)
root.init()
