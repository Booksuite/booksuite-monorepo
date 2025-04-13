import type { Offer } from './Offer.ts'

export type OfferPaginated = {
  /**
   * @type array
   */
  items: Offer[]
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