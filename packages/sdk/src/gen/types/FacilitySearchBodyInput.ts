import type { FacilityOrderByInput } from './FacilityOrderByInput.ts'
import type { FacilitySearchFilterInput } from './FacilitySearchFilterInput.ts'
import type { PaginationQueryInput } from './PaginationQueryInput.ts'

export type FacilitySearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  order?: FacilityOrderByInput
  /**
   * @type object | undefined
   */
  filter?: FacilitySearchFilterInput
}