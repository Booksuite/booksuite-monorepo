import type { HousingUnitType } from './HousingUnitType.ts'

export type HousingUnitTypePaginated = {
  /**
   * @type array
   */
  items: HousingUnitType[]
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