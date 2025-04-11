import type { PriceVariationType } from './PriceVariationType.ts'
import type { SeasonRuleHousingUnitTypePriceInput } from './SeasonRuleHousingUnitTypePriceInput.ts'

export type SeasonRuleUpdateInput = {
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type string | undefined
   */
  startDate?: string
  /**
   * @type string | undefined
   */
  endDate?: string
  /**
   * @type number | undefined
   */
  minDaily?: number
  /**
   * @type array | undefined
   */
  availableWeekDays?: number[]
  priceVariationType?: PriceVariationType
  /**
   * @type number | undefined
   */
  price?: number
  /**
   * @type array | undefined
   */
  housingUnitTypesPrices?: SeasonRuleHousingUnitTypePriceInput[]
}