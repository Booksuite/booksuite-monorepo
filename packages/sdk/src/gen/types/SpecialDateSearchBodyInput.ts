import type { PaginationQueryInput } from './PaginationQueryInput.ts'
import type { SpecialDateOrderByInput } from './SpecialDateOrderByInput.ts'
import type { SpecialDateSearchFilterInput } from './SpecialDateSearchFilterInput.ts'

export type SpecialDateSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  filter?: SpecialDateSearchFilterInput
  /**
   * @type object | undefined
   */
  order?: SpecialDateOrderByInput
}