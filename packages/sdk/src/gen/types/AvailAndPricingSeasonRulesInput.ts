import type { PriceVariationType } from './PriceVariationType.ts'

export type AvailAndPricingSeasonRulesInput = {
  /**
   * @description Season rule ID
   * @type string
   */
  id: string
  /**
   * @description Company ID
   * @type string
   */
  companyId: string
  /**
   * @description Season rule name
   * @type string
   */
  name: string
  /**
   * @description Start date of the season
   * @type string, date-time
   */
  startDate: string
  /**
   * @description End date of the season
   * @type string, date-time
   */
  endDate: string
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
   * @description Whether the season rule is published
   * @type boolean
   */
  published: boolean
  /**
   * @description Visibility start date
   * @type string, date-time
   */
  visibilityStartDate: string | null
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
}