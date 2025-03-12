import type { Facility } from './Facility.ts'

export type HousingUnitTypeFacility = {
  /**
   * @type string
   */
  id: string
  /**
   * @type boolean
   */
  isFeatured: boolean | null
  /**
   * @type object
   */
  facility: Facility
}