import type { Facility } from './Facility.ts'

export type FacilityPaginated = {
  /**
   * @type array
   */
  items: Facility[]
  /**
   * @type number
   */
  totalItems: number
  /**
   * @type number
   */
  totalPages: number
  /**
   * @type number
   */
  currentPage: number
  /**
   * @type number
   */
  prevPage: number | null
  /**
   * @type number
   */
  nextPage: number | null
}