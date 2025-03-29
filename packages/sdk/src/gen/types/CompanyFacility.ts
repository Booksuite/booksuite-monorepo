import type { Facility } from './Facility.ts'

export type CompanyFacility = {
  /**
   * @type string
   */
  id: string
  /**
   * @type number
   */
  order: number | null
  /**
   * @type object
   */
  facility: Facility
  /**
   * @type string, date-time
   */
  createdAt: string
}