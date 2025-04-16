import type { AvailAndPricingSearchInput } from './AvailAndPricingSearchInput.ts'
import type { DateRangeInput } from './DateRangeInput.ts'

export type CalendarBodyInput = {
  /**
   * @description Current date in YYYY-MM-DD format
   * @type string
   */
  currentDate: string
  /**
   * @description Search payload for the calendar
   */
  search: AvailAndPricingSearchInput
  /**
   * @description Date range for the calendar
   */
  viewWindow: DateRangeInput
}