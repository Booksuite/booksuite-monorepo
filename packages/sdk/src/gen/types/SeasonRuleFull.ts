import type { HousingUnitTypePricingChangeInput } from './HousingUnitTypePricingChangeInput.ts'
import type { PriceVariationType } from './PriceVariationType.ts'

export type SeasonRuleFull = {
  /**
   * @type string | undefined
   */
  id?: string
  /**
   * @type string
   */
  name: string
  /**
   * @type boolean
   */
  published: boolean
  /**
   * @type string, date
   */
  visibilityStartDate: string | null
  /**
   * @type string, date
   */
  startDate: string
  /**
   * @type string, date
   */
  endDate: string
  /**
   * @type number
   */
  minStay: number
  /**
   * @type array
   */
  validWeekDays: number[]
  priceVariationType: PriceVariationType
  /**
   * @type number
   */
  priceVariationValue: number
  /**
   * @type array
   */
  housingUnitTypePrices: HousingUnitTypePricingChangeInput[]
}