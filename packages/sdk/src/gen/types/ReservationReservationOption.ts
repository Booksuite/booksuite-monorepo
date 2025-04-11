import type { ReservationOption } from './ReservationOption.ts'

export type ReservationReservationOption = {
  /**
   * @type string
   */
  reservationOptionId: string
  /**
   * @type string
   */
  reservationId: string
  /**
   * @type object
   */
  reservationOption: ReservationOption
}