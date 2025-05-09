import type { PriceVariationType } from './PriceVariationType.ts'

export type AvailAndPricingSpecialDatesInput = {
  /**
   * @description Special date rule ID
   * @type string
   */
  id: string
  /**
   * @description Company ID
   * @type string
   */
  companyId: string
  /**
   * @description Special date rule name
   * @type string
   */
  name: string
  /**
   * @description Start date of the special date period
   * @type string, date-time
   */
  startDate: string
  /**
   * @description End date of the special date period
   * @type string, date-time
   */
  endDate: string
  /**
   * @description Visibility start date
   * @type string, date-time
   */
  visibilityStartDate: string
  /**
   * @description Minimum daily price
   * @type number
   */
  minStay: number
  /**
   * @description Price variation type
   */
  priceVariationType: PriceVariationType
  /**
   * @description Price value
   * @type number
   */
  priceVariationValue: number
  /**
   * @description Whether the special date rule is published
   * @type boolean
   */
  published: boolean
  /**
   * @description Available week days
   * @type array
   */
  validWeekDays: number[]
  /**
   * @description Housing unit type prices
   * @type array
   */
  housingUnitTypePrices: {
    /**
     * @type string | undefined
     */
    housingUnitTypeId?: string
  }[]
  /**
   * @description Special date description
   * @type string
   */
  description: string | null
  /**
   * @description General description
   * @type string
   */
  generalDescription: string | null
}