import { waitElement } from '@zero-dependency/dom'
import { sleep } from '@zero-dependency/utils'
import ms from 'ms'
import {
  MODAL_CONTAINER,
  SUBMIT_BUTTON,
  SURVEY_FIELDS,
  SURVEY_META
} from './constants.js'

export async function getSubmitButton() {
  return await waitElement<HTMLButtonElement>(SUBMIT_BUTTON)
}

export function getModal() {
  return document.querySelector(MODAL_CONTAINER)
}

export async function getSurveyFields() {
  const surveyMetaFields = await waitElement(SURVEY_META)
  if (!surveyMetaFields) return

  // 10 seconds
  await sleep(import.meta.env.DEV ? 5000 : 10000)

  const fieldAttributes = Array.from(
    surveyMetaFields.querySelectorAll(SURVEY_FIELDS)
  )
  if (!fieldAttributes.length) return

  const [
    taskType,
    _,
    estimatedRatingTime
  ] = fieldAttributes

  return {
    taskType: taskType!.textContent!,
    estimatedRatingTime: estimatedRatingTime!.textContent!
  }
}

export function parseTimeToMs(time: string) {
  const times = time
    .trim()
    // by karkar1ch1
    .split(/\s(?=\d)/)

  return times.reduce((acc, value) => {
    // @ts-ignore
    acc += ms(value)
    return acc
  }, 0)
}
