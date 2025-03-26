import type { FacilityInput } from './FacilityInput.ts'

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
  facility: FacilityInput
  /**
   * @type string, date-time
   */
  createdAt: string
}