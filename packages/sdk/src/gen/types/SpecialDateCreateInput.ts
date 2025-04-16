import type { HousingUnitTypePricingChangeInput } from './HousingUnitTypePricingChangeInput.ts'
import type { PriceVariationType } from './PriceVariationType.ts'
import type { SpecialDateMediaInput } from './SpecialDateMediaInput.ts'
import type { SpecialDateServiceInput } from './SpecialDateServiceInput.ts'

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
  /**
   * @type array
   */
  includedServices: SpecialDateServiceInput[]
  /**
   * @type array
   */
  medias: SpecialDateMediaInput[]
}