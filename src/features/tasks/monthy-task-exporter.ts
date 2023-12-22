import dayjs from 'dayjs'
import { createSignal } from 'solid-js'

import { taskBackuper } from './task-backuper.js'

const [showConfirm, setShowConfirm] = createSignal(false)

export function monthyTaskExporter(): void {
  const currentDay = dayjs().day()
  if (currentDay !== 20 || showConfirm()) return

  setShowConfirm(true)
  const isConfirm = confirm(
    'Сегодня 20 числов месяца.\nХотите сделать бэкап данных за месяц?'
  )
  if (isConfirm) return

  taskBackuper.generateMonthyPage()
}
