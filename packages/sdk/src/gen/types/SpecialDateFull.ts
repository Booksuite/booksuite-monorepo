import type { HousingUnitTypePricingChangeInput } from './HousingUnitTypePricingChangeInput.ts'
import type { PriceVariationType } from './PriceVariationType.ts'
import type { SpecialDateMedia } from './SpecialDateMedia.ts'
import type { SpecialDateService } from './SpecialDateService.ts'

export type SpecialDateFull = {
  /**
   * @type string
   */
  id: string
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
   * @type object | undefined
   */
  description?: object
  /**
   * @type object | undefined
   */
  generalDescription?: object
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
  medias: SpecialDateMedia[]
  /**
   * @type array
   */
  housingUnitTypePrices: HousingUnitTypePricingChangeInput[] | null
  /**
   * @type array
   */
  includedServices: SpecialDateService[] | null
}