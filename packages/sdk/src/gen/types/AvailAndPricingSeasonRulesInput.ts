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
  minDaily: number
  /**
   * @description Price variation type
   */
  priceVariationType: PriceVariationType
  /**
   * @description Price value
   * @type number
   */
  price: number
  /**
   * @description Whether the season rule is published
   * @type boolean
   */
  published: boolean
  /**
   * @description Visibility start date
   * @type string, date-time
   */
  visibilityStart: string | null
  /**
   * @description Visibility end date
   * @type string, date-time
   */
  visibilityEnd: string | null
  /**
   * @description Available week days
   * @type array
   */
  availableWeekDays: number[]
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