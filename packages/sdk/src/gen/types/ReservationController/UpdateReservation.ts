import type { Reservation } from '../Reservation.ts'
import type { ReservationCreateInput } from '../ReservationCreateInput.ts'

export type UpdateReservationPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type UpdateReservation200 = Reservation

export type UpdateReservationMutationRequest = ReservationCreateInput

export type UpdateReservationMutationResponse = UpdateReservation200

export type UpdateReservationMutation = {
  Response: UpdateReservation200
  Request: UpdateReservationMutationRequest
  PathParams: UpdateReservationPathParams
  Errors: any
}