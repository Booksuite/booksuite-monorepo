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
  weekdaysPrice: number | null
  /**
   * @type number
   */
  weekendPrice: number | null
  /**
   * @type number
   */
  extraAdultPrice: number | null
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