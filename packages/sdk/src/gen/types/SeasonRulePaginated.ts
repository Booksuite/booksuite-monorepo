import type { SeasonRuleFull } from './SeasonRuleFull.ts'

export type SeasonRulePaginated = {
  /**
   * @type array
   */
  items: SeasonRuleFull[]
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