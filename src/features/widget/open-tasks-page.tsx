import { createMemo } from 'solid-js'
import type { Component } from 'solid-js'

import { currentDate } from '../../utils/current-date.js'
import { storage } from '../storage.js'
import { taskBackuper } from '../tasks/task-backuper.js'

export const OpenTaskPageButton: Component = () => {
  const currentTaskList = createMemo(() => {
    const date = currentDate()
    const findedTaskList = storage.taskList.find((task) => task.date === date)
    return findedTaskList?.total ?? '0'
  })

  return (
    <button
      class="task-counter"
      onClick={() => taskBackuper.generate()}
    >
      {currentTaskList()}
    </button>
  )
}
