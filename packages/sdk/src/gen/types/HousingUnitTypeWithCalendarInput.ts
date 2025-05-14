import type { AvailAndPricingSummaryInput } from './AvailAndPricingSummaryInput.ts'
import type { HousingUnit } from './HousingUnit.ts'

export type HousingUnitTypeWithCalendarInput = {
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
  slug: string
  /**
   * @type string
   */
  shortDescription: string | null
  /**
   * @type boolean
   */
  published: boolean
  /**
   * @type string
   */
  companyId: string
  /**
   * @type string
   */
  description: string | null
  /**
   * @type number
   */
  order: number
  /**
   * @type number
   */
  minGuests: number | null
  /**
   * @type number
   */
  maxGuests: number | null
  /**
   * @type number
   */
  maxAdults: number | null
  /**
   * @type number
   */
  maxChildren: number | null
  /**
   * @type number
   */
  weekdaysPrice: number
  /**
   * @type number
   */
  weekendPrice: number
  /**
   * @type number
   */
  extraAdultPrice: number
  /**
   * @type number
   */
  chargeExtraAdultHigherThan: number
  /**
   * @type string, date-time
   */
  createdAt: string
  /**
   * @type string, date-time
   */
  updatedAt: string
  /**
   * @type object
   */
  deletedAt: object | null
  /**
   * @type array
   */
  housingUnits: HousingUnit[]
  /**
   * @description Calendar data
   * @type object
   */
  calendar: {
    [key: string]: AvailAndPricingSummaryInput
  }
}