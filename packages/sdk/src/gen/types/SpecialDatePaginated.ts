import type { SpecialDateFull } from './SpecialDateFull.ts'

export type SpecialDatePaginated = {
  /**
   * @type array
   */
  items: SpecialDateFull[]
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