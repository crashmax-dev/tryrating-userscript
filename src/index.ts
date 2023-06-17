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
import { Backuper } from './backuper.js'

function createTimer(storage: Storage) {
  const container = el('div', { className: 'tryrating-container' })
  const taskCounter = el('span', `Tasks: ${storage.data.length}`)
  const timer = el('span')

  container.append(timer, taskCounter)
  document.body.appendChild(container)

  return {
    render: (time: string) => {
      timer.textContent = `Time: ${time}`
    }
  }
}

const storage = new Storage()
const backuper = new Backuper(storage)
const timerElement = createTimer(storage)

window.addEventListener('keydown', (event) => {
  // backup
  if (event.altKey && event.code === 'KeyQ') {
    event.preventDefault()
    backuper.download()
  }

  // reset
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
      await sleep(500)

      if (getModal()) {
        GM_notification({
          title: 'Подтвердите задание',
          text: fields.taskType,
          highlight: true,
          silent: false,
          timeout: 0
        })

        submitButton.addEventListener('click', onSubmitTask, { once: true })
      } else {
        onSubmitTask()
      }
    }
  )

  timer.start(ms)
}

init()
