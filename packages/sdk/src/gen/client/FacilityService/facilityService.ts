/* eslint-disable no-alert, no-console */
import { createFacility } from './createFacility.ts'
import { deleteFacility } from './deleteFacility.ts'
import { getFacilityById } from './getFacilityById.ts'
import { searchFacilities } from './searchFacilities.ts'
import { updateFacility } from './updateFacility.ts'

export function facilityService() {
  return { createFacility, getFacilityById, updateFacility, deleteFacility, searchFacilities }
}