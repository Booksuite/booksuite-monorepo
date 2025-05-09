import type { OfferType } from './OfferType.ts'
import type { PriceVariationType } from './PriceVariationType.ts'

export type AvailAndPricingOffersInput = {
  /**
   * @description Purchase start date
   * @type string, date-time
   */
  visibilityStartDate: string
  /**
   * @description Minimum number of days for the offer
   * @type number
   */
  minStay: number | null
  /**
   * @description Valid week days
   * @type array
   */
  validWeekDays: number[]
  /**
   * @description Offer type
   */
  type: OfferType
  /**
   * @description Maximum number of days for the offer
   * @type number
   */
  maxStay: number | null
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
  startDate: string
  /**
   * @description Valid end date
   * @type string, date-time
   */
  endDate: string
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
   * @description Whether the offer is valid for packages
   * @type boolean
   */
  validForPackages: boolean
  /**
   * @description Offer description
   * @type string
   */
  description: string | null
  /**
   * @description Available housing unit types
   * @type array
   */
  validHousingUnitTypes: {
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