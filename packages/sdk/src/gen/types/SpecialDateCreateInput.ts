import type { HousingUnitTypePricingChangeInput } from './HousingUnitTypePricingChangeInput.ts'
import type { PriceVariationType } from './PriceVariationType.ts'
import type { SpecialDateMediaInput } from './SpecialDateMediaInput.ts'

export type SpecialDateCreateInput = {
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
  visibilityStartDate: string
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
   * @type string
   */
  description?: string | null
  /**
   * @type string
   */
  generalDescription?: string | null
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
  /**
   * @type array
   */
  medias: SpecialDateMediaInput[]
}