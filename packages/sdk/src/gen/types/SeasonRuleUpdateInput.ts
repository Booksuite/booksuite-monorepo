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
   * @type string, date
   */
  visibilityStartDate?: string | null
  /**
   * @type string | undefined, date
   */
  startDate?: string
  /**
   * @type string | undefined, date
   */
  endDate?: string
  /**
   * @type number | undefined
   */
  minDaily?: number
  /**
   * @type array | undefined
   */
  validWeekDays?: number[]
  priceVariationType?: PriceVariationType
  /**
   * @type number | undefined
   */
  priceVariationValue?: number
  /**
   * @type array | undefined
   */
  housingUnitTypePrices?: HousingUnitTypePricingChangeInput[]
}