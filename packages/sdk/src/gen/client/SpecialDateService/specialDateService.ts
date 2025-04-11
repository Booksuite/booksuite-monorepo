/* eslint-disable no-alert, no-console */
import { createSpecialDate } from './createSpecialDate.ts'
import { getSpecialDateById } from './getSpecialDateById.ts'
import { searchServices } from './searchServices.ts'
import { updateSpecialDate } from './updateSpecialDate.ts'

export function specialDateService() {
  return { createSpecialDate, getSpecialDateById, updateSpecialDate, searchServices }
}