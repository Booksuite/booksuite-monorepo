import type { DateRangeInput } from './DateRangeInput.ts'

export type CalendarBodyInput = {
  /**
   * @description Current date in YYYY-MM-DD format
   * @type string
   */
  currentDate: string
  /**
   * @description Date range for the calendar
   */
  dateRange: DateRangeInput
}