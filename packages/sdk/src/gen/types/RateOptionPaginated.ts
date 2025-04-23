import type { RateOptionFull } from './RateOptionFull.ts'

export type RateOptionPaginated = {
  /**
   * @type array
   */
  items: RateOptionFull[]
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