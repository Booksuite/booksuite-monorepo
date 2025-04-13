import type { AvailabilityInput } from './AvailabilityInput.ts'
import type { AvailAndPricingOffersInput } from './AvailAndPricingOffersInput.ts'
import type { AvailAndPricingReservationInput } from './AvailAndPricingReservationInput.ts'
import type { AvailAndPricingSeasonRulesInput } from './AvailAndPricingSeasonRulesInput.ts'
import type { AvailAndPricingSpecialDatesInput } from './AvailAndPricingSpecialDatesInput.ts'
import type { HostingRules } from './HostingRules.ts'

export type CalendarDay = {
  /**
   * @description Base price for the day
   * @type number
   */
  basePrice: number
  /**
   * @description Final price after all adjustments
   * @type number
   */
  finalPrice: number
  /**
   * @description Final minimum days required
   * @type number
   */
  finalMinDays: number
  /**
   * @description Hosting rules for the day
   */
  hostingRules: HostingRules
  /**
   * @description Season rules applicable for the day
   */
  seasonRules: AvailAndPricingSeasonRulesInput | null
  /**
   * @description Special dates applicable for the day
   */
  specialDates: AvailAndPricingSpecialDatesInput | null
  /**
   * @description Offers applicable for the day
   */
  offers: AvailAndPricingOffersInput | null
  /**
   * @description Reservations for the day
   * @type array
   */
  reservations: AvailAndPricingReservationInput[]
  /**
   * @description Availability status for the day
   */
  availability: AvailabilityInput
}