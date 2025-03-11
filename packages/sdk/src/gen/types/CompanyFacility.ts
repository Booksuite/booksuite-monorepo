import type { FacilityInput } from './FacilityInput.ts'

export type CompanyFacility = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string, date-time
   */
  updatedAt: string
  /**
   * @type object
   */
  facility: FacilityInput
}