import type { PriceVariationType } from './PriceVariationType.ts'

export type UpdateOfferDto = {
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type string | undefined
   */
  description?: string
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type string | undefined, date
   */
  purchaseStartDate?: string
  /**
   * @type string | undefined, date
   */
  purchaseEndDate?: string
  /**
   * @type string, date
   */
  validStartDate?: string | null
  /**
   * @type string, date
   */
  validEndDate?: string | null
  /**
   * @type number
   */
  minDays?: number | null
  /**
   * @type number
   */
  maxDays?: number | null
  /**
   * @type number
   */
  minAdvanceDays?: number | null
  /**
   * @type number
   */
  maxAdvanceDays?: number | null
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
   * @type array | undefined
   */
  validServices?: string[]
  priceAdjustmentType?: PriceVariationType
  /**
   * @type number | undefined
   */
  priceAdjustmentValue?: number
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
   * @type string
   */
  couponCode?: string | null
}