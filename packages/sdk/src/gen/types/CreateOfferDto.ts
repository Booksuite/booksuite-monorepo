import type { PriceVariationType } from './PriceVariationType.ts'

export type CreateOfferDtoType = 'SERVICE' | 'HOUSING_UNIT_TYPE'

export type CreateOfferDto = {
  /**
   * @type string
   */
  name: string
  /**
   * @type string
   */
  type: CreateOfferDtoType
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
  visibilityStartDate: string
  /**
   * @type string, date
   */
  startDate: string
  /**
   * @type string, date
   */
  endDate: string
  /**
   * @type number | undefined
   */
  minStay?: number
  /**
   * @type number | undefined
   */
  maxStay?: number
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