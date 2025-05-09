import type { AvailAndPricingAgeGroupSearchInput } from './AvailAndPricingAgeGroupSearchInput.ts'
import type { AvailAndPricingServiceInput } from './AvailAndPricingServiceInput.ts'
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
  services?: AvailAndPricingServiceInput[]
}