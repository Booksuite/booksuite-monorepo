import type { DateRangeInput } from './DateRangeInput.ts'

export type SeasonRuleSearchFilterInput = {
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type object | undefined
   */
  DateRange?: DateRangeInput
  /**
   * @type object | undefined
   */
  endDate?: DateRangeInput
}