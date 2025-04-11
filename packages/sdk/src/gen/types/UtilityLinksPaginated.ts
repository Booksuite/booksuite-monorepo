import type { UtilityLinks } from './UtilityLinks.ts'

export type UtilityLinksPaginated = {
  /**
   * @type array
   */
  items: UtilityLinks[]
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