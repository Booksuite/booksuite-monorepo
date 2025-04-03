import type { PaginationQueryInput } from './PaginationQueryInput.ts'
import type { SeasonRuleOrderByInput } from './SeasonRuleOrderByInput.ts'
import type { SeasonRuleSearchFilterInput } from './SeasonRuleSearchFilterInput.ts'

export type SeasonRuleSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  filter?: SeasonRuleSearchFilterInput
  /**
   * @type object | undefined
   */
  order?: SeasonRuleOrderByInput
}