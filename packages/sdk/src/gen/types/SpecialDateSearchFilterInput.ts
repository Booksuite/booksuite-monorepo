import type { DateRangeInput } from './DateRangeInput.ts'

export type SpecialDateSearchFilterInput = {
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type object | undefined
   */
  startDate?: DateRangeInput
  /**
   * @type object | undefined
   */
  endDate?: DateRangeInput
}