import type { Reservation } from './Reservation.ts'

export type ReservationPaginated = {
  /**
   * @type array
   */
  items: Reservation[]
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