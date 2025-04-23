import type { HousingUnitTypePricingChangeInput } from './HousingUnitTypePricingChangeInput.ts'
import type { PriceVariationType } from './PriceVariationType.ts'

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
  housingUnitTypePrices?: HousingUnitTypePricingChangeInput[]
}