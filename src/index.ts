import { el } from '@zero-dependency/dom'
import { sleep } from '@zero-dependency/utils'
import {
  getModal,
  getSubmitButton,
  getSurveyFields,
  parseTimeToMs
} from './helpers.js'
import { Storage } from './storage.js'
import { Timer } from './timer.js'
import './styles.css'
import { Backuper } from './backup.js'

function createTimer() {
  const container = el('div', { className: 'timer-container' })
  const timer = el('time')

  container.append(timer)
  document.body.appendChild(container)

  return {
    render: (time: string) => {
      timer.textContent = time
    }
  }
}

const storage = new Storage()
const backuper = new Backuper(storage)
const timerElement = createTimer()

window.addEventListener('keydown', (event) => {
  if (event.altKey && event.code === 'KeyQ') {
    event.preventDefault()
    backuper.download()
  }

  if (event.altKey && event.code === 'KeyW') {
    event.preventDefault()
    if (confirm('Reset data.\nAre you sure?')) {
      storage.reset()
    }
  }
})

async function init() {
  const submitButton = await getSubmitButton()
  const fields = await getSurveyFields()
  if (!fields) {
    alert(
      'Задание не найдено, обновите страницу или обратитесь к разработчику!'
    )
    return
  }

  async function onSubmitTask() {
    storage.write({ type: fields!.taskType, estimated: ms })
    await sleep(5000)
    location.reload()
  }

  const ms = parseTimeToMs(fields.estimatedRatingTime)
  const timer = new Timer(
    (time) => timerElement.render(time),
    async () => {
      submitButton.click()

      if (!getModal()) {
        GM_notification({
          title: 'Подтвердите задание',
          text: fields.taskType,
          highlight: true,
          silent: false,
          timeout: 0
        })

        submitButton.addEventListener('click', onSubmitTask, { once: true })
        return
      }

      onSubmitTask()
    }
  )

  timer.start(ms)
}

init()
