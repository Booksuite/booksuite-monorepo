import type { AvailAndPricingHousingUnitTypeInput } from './AvailAndPricingHousingUnitTypeInput.ts'
import type { AvailAndPricingSummaryInput } from './AvailAndPricingSummaryInput.ts'
import type { HousingUnit } from './HousingUnit.ts'

export type ReservationSummaryInput = {
  /**
   * @type object
   */
  housingUnitType: AvailAndPricingHousingUnitTypeInput
  /**
   * @description Housing unit for the day
   */
  housingUnit: HousingUnit | null
  /**
   * @type object
   */
  summary: AvailAndPricingSummaryInput
}