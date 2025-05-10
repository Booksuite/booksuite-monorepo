import type { AvailabilityInput } from './AvailabilityInput.ts'
import type { AvailAndPricingOffersInput } from './AvailAndPricingOffersInput.ts'
import type { AvailAndPricingRateOptionInput } from './AvailAndPricingRateOptionInput.ts'
import type { AvailAndPricingReservationInput } from './AvailAndPricingReservationInput.ts'
import type { AvailAndPricingSeasonRulesInput } from './AvailAndPricingSeasonRulesInput.ts'
import type { AvailAndPricingSpecialDatesInput } from './AvailAndPricingSpecialDatesInput.ts'
import type { HostingRules } from './HostingRules.ts'
import type { Service } from './Service.ts'

export type PricingSummaryInput = {
  /**
   * @description Base price for the day
   * @type number
   */
  basePrice: number
  /**
   * @description Services price for the day
   * @type number
   */
  servicesPrice: number
  /**
   * @description Children price for the day
   * @type number
   */
  childrenPrice: number
  /**
   * @description Rate option price for the day
   * @type number
   */
  rateOptionPrice: number
  /**
   * @description Final price for the day
   * @type number
   */
  finalPrice: number
  /**
   * @description Final minimum days required
   * @type number
   */
  finalMinStay: number
  /**
   * @description Season rules for the day
   * @type array
   */
  seasonRules: AvailAndPricingSeasonRulesInput[]
  /**
   * @description Special dates for the day
   * @type array
   */
  specialDates: AvailAndPricingSpecialDatesInput[]
  /**
   * @description Offers for the day
   * @type array
   */
  offers: AvailAndPricingOffersInput[]
  /**
   * @description Reservations for the day
   * @type array
   */
  reservations: AvailAndPricingReservationInput[]
  /**
   * @description Availability for the day
   * @type array
   */
  availability: AvailabilityInput[]
  /**
   * @description Hosting rules for the day
   */
  hostingRules: HostingRules
  /**
   * @description Services for the day
   * @type array
   */
  services: Service[]
  /**
   * @description Rate option for the day
   */
  rateOption: AvailAndPricingRateOptionInput | null
  /**
   * @description Total days for the day
   * @type number
   */
  totalStay: number | null
}