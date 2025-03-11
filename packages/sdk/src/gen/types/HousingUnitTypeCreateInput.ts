import type { HousingUnitInput } from './HousingUnitInput.ts'
import type { HousingUnitTypeFacilityInput } from './HousingUnitTypeFacilityInput.ts'
import type { HousingUnitTypeMediaInput } from './HousingUnitTypeMediaInput.ts'

export type HousingUnitTypeCreateInput = {
  /**
   * @type string
   */
  name: string
  /**
   * @type boolean
   */
  published: boolean
  /**
   * @type string
   */
  slug: string
  /**
   * @type string | undefined
   */
  shortDescription?: string
  /**
   * @type string | undefined
   */
  description?: string
  /**
   * @type number
   */
  order: number
  /**
   * @type number | undefined
   */
  minGuests?: number
  /**
   * @type number | undefined
   */
  maxGuests?: number
  /**
   * @type number | undefined
   */
  maxAdults?: number
  /**
   * @type number | undefined
   */
  maxChildren?: number
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
   * @type array
   */
  housingUnits: HousingUnitInput[]
  /**
   * @type array
   */
  facilities: HousingUnitTypeFacilityInput[]
  /**
   * @type array
   */
  medias: HousingUnitTypeMediaInput[]
}