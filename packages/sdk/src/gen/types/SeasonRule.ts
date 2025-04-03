import type { PriceVariationType } from './PriceVariationType.ts'

export type SeasonRule = {
  /**
   * @type string | undefined
   */
  id?: string
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
   * @type array
   */
  availableWeekend: number[]
  priceVariationType: PriceVariationType
  /**
   * @type number
   */
  price: number
}