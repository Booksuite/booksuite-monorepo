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
}