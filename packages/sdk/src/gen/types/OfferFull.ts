import type { OfferHousingUnitType } from './OfferHousingUnitType.ts'
import type { OfferPaymentMethod } from './OfferPaymentMethod.ts'
import type { OfferService } from './OfferService.ts'

export type OfferResponseFullDTOType = 'SERVICE' | 'HOUSING_UNIT_TYPE'

export type OfferResponseFullDTOPriceAdjustmentType = 'ABSOLUTE_INCREASE' | 'ABSOLUTE_REDUCTION' | 'PERCENTAGE_INCREASE' | 'PERCENTAGE_REDUCTION' | 'CUSTOM'

export type OfferFull = {
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
  type: OfferResponseFullDTOType
  /**
   * @type string
   */
  description: string | null
  /**
   * @type boolean
   */
  published: boolean
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
   * @type number
   */
  minStay: number | null
  /**
   * @type number
   */
  maxStay: number | null
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
  validWeekDays: number[]
  /**
   * @type string
   */
  priceAdjustmentType: OfferResponseFullDTOPriceAdjustmentType
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
  /**
   * @type array
   */
  validHousingUnitTypes: OfferHousingUnitType[]
  /**
   * @type array
   */
  validPaymentMethods: OfferPaymentMethod[]
  /**
   * @type array
   */
  validServices: OfferService[]
}