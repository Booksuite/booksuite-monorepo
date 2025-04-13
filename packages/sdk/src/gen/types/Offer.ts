export type OfferResponseDTOPriceAdjustmentType = 'ABSOLUTE_INCREASE' | 'ABSOLUTE_REDUCTION' | 'PERCENTAGE_INCREASE' | 'PERCENTAGE_REDUCTION' | 'CUSTOM'

export type Offer = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  name: string
  /**
   * @type string
   */
  description: string | null
  /**
   * @type boolean
   */
  published: boolean
  /**
   * @type string, date-time
   */
  purchaseStartDate: string
  /**
   * @type string, date-time
   */
  purchaseEndDate: string
  /**
   * @type object
   */
  validStartDate: object | null
  /**
   * @type object
   */
  validEndDate: object | null
  /**
   * @type number
   */
  minDays: number | null
  /**
   * @type number
   */
  maxDays: number | null
  /**
   * @type number
   */
  minAdvanceDays: number | null
  /**
   * @type number
   */
  maxAdvanceDays: number | null
  /**
   * @type boolean
   */
  validForAbandoned: boolean
  /**
   * @type boolean
   */
  validForPackages: boolean
  /**
   * @type array
   */
  availableWeekDays: number[]
  /**
   * @type string
   */
  priceAdjustmentType: OfferResponseDTOPriceAdjustmentType
  /**
   * @type number
   */
  priceAdjustmentValue: number
  /**
   * @type boolean
   */
  showInHighlights: boolean
  /**
   * @type boolean
   */
  showDiscountTag: boolean
  /**
   * @type boolean
   */
  isExclusive: boolean
  /**
   * @type string
   */
  couponCode: string | null
  /**
   * @type string
   */
  companyId: string
  /**
   * @type string, date-time
   */
  createdAt: string
  /**
   * @type string, date-time
   */
  updatedAt: string
}