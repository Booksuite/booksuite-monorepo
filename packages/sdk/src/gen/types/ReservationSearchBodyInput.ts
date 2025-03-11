import type { PaginationQueryInput } from './PaginationQueryInput.ts'
import type { ReservationOrderByInput } from './ReservationOrderByInput.ts'
import type { ReservationSearchFilterInput } from './ReservationSearchFilterInput.ts'

export type ReservationSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  filter?: ReservationSearchFilterInput
  /**
   * @type object | undefined
   */
  order?: ReservationOrderByInput
}