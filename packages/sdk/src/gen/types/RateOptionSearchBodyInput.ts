import type { PaginationQueryInput } from './PaginationQueryInput.ts'
import type { RateOptionOrderByInput } from './RateOptionOrderByInput.ts'
import type { RateOptionSearchFilterInput } from './RateOptionSearchFilterInput.ts'

export type RateOptionSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  filter?: RateOptionSearchFilterInput
  /**
   * @type object | undefined
   */
  order?: RateOptionOrderByInput
}