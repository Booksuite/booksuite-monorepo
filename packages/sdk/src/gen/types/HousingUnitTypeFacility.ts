import type { Facility } from './Facility.ts'

export type HousingUnitTypeFacility = {
  /**
   * @type string
   */
  id: string
  /**
   * @type object | undefined
   */
  isFeatured?: object
  /**
   * @type object
   */
  facility: Facility
}