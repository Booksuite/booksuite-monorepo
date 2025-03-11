import type { HousingUnitTypeOrderByInput } from './HousingUnitTypeOrderByInput.ts'
import type { HousingUnitTypeSearchFilterInput } from './HousingUnitTypeSearchFilterInput.ts'
import type { PaginationQueryInput } from './PaginationQueryInput.ts'

export type HousingUnitTypeSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  filter?: HousingUnitTypeSearchFilterInput
  /**
   * @type object | undefined
   */
  order?: HousingUnitTypeOrderByInput
}