import type { ServiceFull } from './ServiceFull.ts'

export type ServicePaginated = {
  /**
   * @type array
   */
  items: ServiceFull[]
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