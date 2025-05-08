import type { AvailAndPricingSearchInput } from './AvailAndPricingSearchInput.ts'

export type CalculatePriceBody = {
  /**
   * @description Current date in YYYY-MM-DD format
   * @type string
   */
  currentDate: string
  /**
   * @description Search payload for the calendar
   */
  search: AvailAndPricingSearchInput
}