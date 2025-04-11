import type { DateRangeInput } from './DateRangeInput.ts'

export type UtilityLinksSearchFilterInput = {
  /**
   * @type boolean | undefined
   */
  published?: boolean
  startDate?: DateRangeInput
  endDate?: DateRangeInput
}