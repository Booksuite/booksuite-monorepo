import type { HousingUnitTypeFull } from './HousingUnitTypeFull.ts'

export type HousingUnitTypePaginated = {
  /**
   * @type array
   */
  items: HousingUnitTypeFull[]
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