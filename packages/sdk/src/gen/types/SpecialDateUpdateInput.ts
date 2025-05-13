import type { HousingUnitTypePricingChangeInput } from './HousingUnitTypePricingChangeInput.ts'
import type { PriceVariationType } from './PriceVariationType.ts'
import type { SpecialDateMediaInput } from './SpecialDateMediaInput.ts'

export type SpecialDateUpdateInput = {
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
   * @type string | undefined, date-time
   */
  endDate?: string
  /**
   * @type number | undefined
   */
  minDaily?: number
  /**
   * @type string
   */
  description?: string | null
  /**
   * @type string
   */
  generalDescription?: string | null
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
  /**
   * @type array | undefined
   */
  medias?: SpecialDateMediaInput[]
}