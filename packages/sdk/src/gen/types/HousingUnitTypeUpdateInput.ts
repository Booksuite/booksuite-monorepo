import type { HousingUnitInput } from './HousingUnitInput.ts'
import type { HousingUnitTypeFacilityInput } from './HousingUnitTypeFacilityInput.ts'
import type { HousingUnitTypeMediaInput } from './HousingUnitTypeMediaInput.ts'

export type HousingUnitTypeUpdateInput = {
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type string | undefined
   */
  slug?: string
  /**
   * @type string
   */
  shortDescription?: string | null
  /**
   * @type string
   */
  description?: string | null
  /**
   * @type number | undefined
   */
  order?: number
  /**
   * @type number
   */
  minGuests?: number | null
  /**
   * @type number
   */
  maxGuests?: number | null
  /**
   * @type number
   */
  maxAdults?: number | null
  /**
   * @type number
   */
  maxChildren?: number | null
  /**
   * @type number | undefined
   */
  weekdaysPrice?: number
  /**
   * @type number | undefined
   */
  weekendPrice?: number
  /**
   * @type number | undefined
   */
  extraAdultPrice?: number
  /**
   * @type number | undefined
   */
  chargeExtraAdultHigherThan?: number
  /**
   * @type array | undefined
   */
  housingUnits?: HousingUnitInput[]
  /**
   * @type array | undefined
   */
  facilities?: HousingUnitTypeFacilityInput[]
  /**
   * @type array | undefined
   */
  medias?: HousingUnitTypeMediaInput[]
}