import type { PriceVariationType } from './PriceVariationType.ts'

export type SpecialDate = {
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
}