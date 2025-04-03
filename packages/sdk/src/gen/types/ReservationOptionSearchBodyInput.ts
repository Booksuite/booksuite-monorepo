import type { PaginationQueryInput } from './PaginationQueryInput.ts'
import type { ReservationOptionOrderByInput } from './ReservationOptionOrderByInput.ts'
import type { ReservationOptionSearchFilterInput } from './ReservationOptionSearchFilterInput.ts'

export type ReservationOptionSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  filter?: ReservationOptionSearchFilterInput
  /**
   * @type object | undefined
   */
  order?: ReservationOptionOrderByInput
}