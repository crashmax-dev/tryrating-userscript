import { setInterval } from 'worker-timers'
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
  private submitButtons: HTMLButtonElement[] = []
  private taskFields: TaskFields | null = null
  private modal: Element | null = null

  constructor(private readonly storage: Storage) {}

  init(): void {
    this.backuper = new Backuper(this.storage)

    this.ui = new Ui(this.storage)
    this.ui.init()

    this.timer = new Timer()
    this.timer.onTimerTick((time) => this.ui.renderTime(time))
    this.timer.onTimerEnd(async () => {
      if (!this.submitButtons.length) {
        console.error('submitButtons is not defined')
        return
      }

      this.submitButtons[0]!.click()
    })

    this.taskFieldsWatcher = new TaskFieldsWatcher()
    this.taskFieldsWatcher.onChangeTask((taskFields) => {
      // write task fields
      if (
        this.taskFields &&
        this.taskFields.requestId !== taskFields.requestId
      ) {
        console.info('Current task is submitted:', this.taskFields)
        this.writeSubmittedTask()
      }

      this.taskFields = taskFields
      this.submitButtons = getSubmitButtons()

      // start timer
      const taskTime = parseTimeToMs(this.taskFields.estimatedRatingTime)
      this.timer.start(taskTime)
    })

    setInterval(() => {
      this.taskFieldsWatcher.watch()

      if (getModal()) {
        GM_notification({
          title: 'Открылось модальное окно',
          highlight: true,
          silent: false,
          timeout: 5000
        })
      }
    }, 5000)

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
          this.ui.renderTaskCounter()
        }
      }
    })
  }

  writeSubmittedTask(): void {
    this.storage.write({
      type: this.taskFields!.taskType,
      estimated: parseTimeToMs(this.taskFields!.estimatedRatingTime)
    })
    this.ui.renderTaskCounter()
  }
}

const storage = new Storage()
const root = new App(storage)
root.init()
