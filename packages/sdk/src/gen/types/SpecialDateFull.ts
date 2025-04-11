import type { PriceVariationType } from './PriceVariationType.ts'
import type { SpecialDateHousingUnitType } from './SpecialDateHousingUnitType.ts'
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
  availableWeekDays: number[]
  priceVariationType: PriceVariationType
  /**
   * @type number
   */
  price: number
  /**
   * @type array
   */
  medias: SpecialDateMedia[]
  /**
   * @type array
   */
  housingUnitTypePrices: SpecialDateHousingUnitType[] | null
  /**
   * @type array
   */
  includedServices: SpecialDateService[] | null
}