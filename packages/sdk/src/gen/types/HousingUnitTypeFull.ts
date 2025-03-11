import type { HousingUnit } from './HousingUnit.ts'
import type { HousingUnitTypeFacility } from './HousingUnitTypeFacility.ts'
import type { HousingUnitTypeMedia } from './HousingUnitTypeMedia.ts'

export type HousingUnitTypeFull = {
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
   * @type object | undefined
   */
  shortDescription?: object
  /**
   * @type object | undefined
   */
  description?: object
  /**
   * @type number
   */
  order: number
  /**
   * @type object | undefined
   */
  minGuests?: object
  /**
   * @type object | undefined
   */
  maxGuests?: object
  /**
   * @type object | undefined
   */
  maxAdults?: object
  /**
   * @type object | undefined
   */
  maxChildren?: object
  /**
   * @type object
   */
  weekdaysPrice: object
  /**
   * @type object
   */
  weekendPrice: object
  /**
   * @type object
   */
  extraAdultPrice: object
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
   * @type array
   */
  housingUnits: HousingUnit[]
  /**
   * @type array
   */
  facilities: HousingUnitTypeFacility[]
  /**
   * @type array
   */
  medias: HousingUnitTypeMedia[]
}