import type { PriceVariationType } from './PriceVariationType.ts'

export type AvailAndPricingOffersInput = {
  /**
   * @description Purchase start date
   * @type string, date-time
   */
  purchaseStartDate: string
  /**
   * @description Purchase end date
   * @type string, date-time
   */
  purchaseEndDate: string
  /**
   * @description Minimum number of days for the offer
   * @type number
   */
  minDays: number | null
  /**
   * @description Maximum number of days for the offer
   * @type number
   */
  maxDays: number | null
  /**
   * @description Minimum advance days required
   * @type number
   */
  minAdvanceDays: number | null
  /**
   * @description Maximum advance days allowed
   * @type number
   */
  maxAdvanceDays: number | null
  /**
   * @description Whether the offer is valid for abandoned bookings
   * @type boolean
   */
  validForAbandoned: boolean
  /**
   * @description Whether to show the offer in highlights
   * @type boolean
   */
  showInHighlights: boolean
  /**
   * @description Whether to show discount tag
   * @type boolean
   */
  showDiscountTag: boolean
  /**
   * @description Whether the offer is exclusive
   * @type boolean
   */
  isExclusive: boolean
  /**
   * @description Coupon code for the offer
   * @type string
   */
  couponCode: string | null
  /**
   * @description Offer ID
   * @type string
   */
  id: string
  /**
   * @description Company ID
   * @type string
   */
  companyId: string
  /**
   * @description Offer name
   * @type string
   */
  name: string
  /**
   * @description Valid start date
   * @type string, date-time
   */
  validStartDate: string
  /**
   * @description Valid end date
   * @type string, date-time
   */
  validEndDate: string
  /**
   * @description Price adjustment type
   */
  priceAdjustmentType: PriceVariationType
  /**
   * @description Price adjustment value
   * @type number
   */
  priceAdjustmentValue: number
  /**
   * @description Available week days
   * @type array
   */
  availableWeekDays: number[]
  /**
   * @description Whether the offer is valid for packages
   * @type boolean
   */
  validForPackages: boolean
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
   * @description Offer description
   * @type string
   */
  description: string | null
  /**
   * @description Available housing unit types
   * @type array
   */
  availableHousingUnitTypes: {
    /**
     * @type string | undefined
     */
    housingUnitTypeId?: string
  }[]
  /**
   * @description Whether the offer is published
   * @type boolean
   */
  published: boolean
  /**
   * @description Creation date
   * @type string, date-time
   */
  createdAt: string
  /**
   * @description Last update date
   * @type string, date-time
   */
  updatedAt: string
}