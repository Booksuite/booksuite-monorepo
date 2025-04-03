import type { ReservationOptionFull } from './ReservationOptionFull.ts'

export type ReservationOptionPaginated = {
  /**
   * @type array
   */
  items: ReservationOptionFull[]
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