import type { PaginationQueryInput } from './PaginationQueryInput.ts'
import type { UtilityLinksOrderByInput } from './UtilityLinksOrderByInput.ts'
import type { UtilityLinksSearchFilterInput } from './UtilityLinksSearchFilterInput.ts'

export type UtilityLinksSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  filter?: UtilityLinksSearchFilterInput
  /**
   * @type object | undefined
   */
  order?: UtilityLinksOrderByInput
}