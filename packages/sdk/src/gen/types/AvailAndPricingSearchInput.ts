import type { AvailAndPricingAgeGroupSearchInput } from './AvailAndPricingAgeGroupSearchInput.ts'
import type { AvailAndPricingSearchServiceInput } from './AvailAndPricingSearchServiceInput.ts'
import type { DateRangeInput } from './DateRangeInput.ts'

export type AvailAndPricingSearchInput = {
  /**
   * @description Date range for the calendar
   */
  dateRange: DateRangeInput
  /**
   * @description Number of adults
   * @type number
   */
  adults: number
  /**
   * @description Age groups and quantity
   * @type array | undefined
   */
  ageGroups?: AvailAndPricingAgeGroupSearchInput[]
  /**
   * @description Services
   * @type array | undefined
   */
  services?: AvailAndPricingSearchServiceInput[]
  /**
   * @description Rate option ID
   * @type string | undefined
   */
  rateOptionId?: string
}