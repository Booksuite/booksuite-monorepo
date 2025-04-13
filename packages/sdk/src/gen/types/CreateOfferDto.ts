import type { PriceVariationType } from './PriceVariationType.ts'

export type CreateOfferDto = {
  /**
   * @type string
   */
  name: string
  /**
   * @type string | undefined
   */
  description?: string
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type string, date
   */
  purchaseStartDate: string
  /**
   * @type string, date
   */
  purchaseEndDate: string
  /**
   * @type string | undefined, date
   */
  validStartDate?: string
  /**
   * @type string | undefined, date
   */
  validEndDate?: string
  /**
   * @type number | undefined
   */
  minDays?: number
  /**
   * @type number | undefined
   */
  maxDays?: number
  /**
   * @type number | undefined
   */
  minAdvanceDays?: number
  /**
   * @type number | undefined
   */
  maxAdvanceDays?: number
  /**
   * @type boolean | undefined
   */
  validForAbandoned?: boolean
  /**
   * @type boolean | undefined
   */
  validForPackages?: boolean
  /**
   * @type array | undefined
   */
  availableHousingUnitTypes?: string[]
  /**
   * @type array | undefined
   */
  validPaymentMethods?: string[]
  /**
   * @type array | undefined
   */
  availableWeekDays?: number[]
  /**
   * @type array
   */
  validServices: string[]
  priceAdjustmentType: PriceVariationType
  /**
   * @type number
   */
  priceAdjustmentValue: number
  /**
   * @type boolean | undefined
   */
  showInHighlights?: boolean
  /**
   * @type boolean | undefined
   */
  showDiscountTag?: boolean
  /**
   * @type boolean | undefined
   */
  isExclusive?: boolean
  /**
   * @type string | undefined
   */
  couponCode?: string
}