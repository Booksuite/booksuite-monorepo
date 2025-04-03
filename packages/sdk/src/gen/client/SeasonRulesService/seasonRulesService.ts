/* eslint-disable no-alert, no-console */
import { searchSeasonRules } from './searchSeasonRules.ts'
import { seasonRulesControllerCreate } from './seasonRulesControllerCreate.ts'
import { seasonRulesControllerGetById } from './seasonRulesControllerGetById.ts'
import { seasonRulesControllerUpdate } from './seasonRulesControllerUpdate.ts'

export function seasonRulesService() {
  return { seasonRulesControllerGetById, seasonRulesControllerUpdate, seasonRulesControllerCreate, searchSeasonRules }
}