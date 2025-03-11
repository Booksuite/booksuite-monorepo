/* eslint-disable no-alert, no-console */
import { createHousingUnitType } from './createHousingUnitType.ts'
import { deleteHousingUnitType } from './deleteHousingUnitType.ts'
import { getHousingUnitTypeById } from './getHousingUnitTypeById.ts'
import { searchHousingUnitTypes } from './searchHousingUnitTypes.ts'
import { updateHousingUnitType } from './updateHousingUnitType.ts'

export function housingUnitTypeService() {
  return { createHousingUnitType, getHousingUnitTypeById, updateHousingUnitType, deleteHousingUnitType, searchHousingUnitTypes }
}