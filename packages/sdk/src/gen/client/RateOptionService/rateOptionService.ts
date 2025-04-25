/* eslint-disable no-alert, no-console */
import { createRateOption } from './createRateOption.ts'
import { getRateOptionById } from './getRateOptionById.ts'
import { searchRateOption } from './searchRateOption.ts'
import { updateRateOption } from './updateRateOption.ts'

export function rateOptionService() {
  return { getRateOptionById, updateRateOption, createRateOption, searchRateOption }
}