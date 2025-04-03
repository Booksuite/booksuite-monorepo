import type { PriceVariationType } from './PriceVariationType.ts'
import type { SeasonRuleHousingUnitTypePriceInput } from './SeasonRuleHousingUnitTypePriceInput.ts'

export type SeasonRuleInput = {
  /**
   * @type string
   */
  name: string
  /**
   * @type boolean
   */
  published: boolean
  /**
   * @type string
   */
  startDate: string
  /**
   * @type string
   */
  endDate: string
  /**
   * @type number
   */
  minDaily: number
  /**
   * @type array
   */
  availableWeekend: number[]
  priceVariationType: PriceVariationType
  /**
   * @type number
   */
  price: number
  /**
   * @type array
   */
  housingUnitTypePrices: SeasonRuleHousingUnitTypePriceInput[]
}