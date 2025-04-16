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
   * @type string, date-time
   */
  startDate: string
  /**
   * @type string, date-time
   */
  endDate: string
  /**
   * @type number
   */
  minDaily: number
  /**
   * @type array
   */
  availableWeekDays: number[]
  priceVariationType: PriceVariationType
  /**
   * @type number
   */
  price: number
  /**
   * @type array
   */
  housingUnitTypePrices: HousingUnitTypePricingChangeInput[]
}