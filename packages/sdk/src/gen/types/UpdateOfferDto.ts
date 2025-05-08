import type { PriceVariationType } from './PriceVariationType.ts'

export type UpdateOfferDtoType = 'SERVICE' | 'HOUSING_UNIT_TYPE'

export type UpdateOfferDto = {
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type string | undefined
   */
  type?: UpdateOfferDtoType
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
  visibilityStartDate?: string
  /**
   * @type string | undefined, date
   */
  startDate?: string
  /**
   * @type string | undefined, date
   */
  endDate?: string
  /**
   * @type number
   */
  minStay?: number | null
  /**
   * @type number
   */
  maxStay?: number | null
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
  validHousingUnitTypes?: string[]
  /**
   * @type array | undefined
   */
  validPaymentMethods?: string[]
  /**
   * @type array | undefined
   */
  validWeekDays?: number[]
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