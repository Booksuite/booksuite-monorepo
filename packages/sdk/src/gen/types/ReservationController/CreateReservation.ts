import type { Reservation } from '../Reservation.ts'
import type { ReservationCreateInput } from '../ReservationCreateInput.ts'

export type CreateReservationPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type CreateReservation200 = Reservation

export type CreateReservationMutationRequest = ReservationCreateInput

export type CreateReservationMutationResponse = CreateReservation200

export type CreateReservationMutation = {
  Response: CreateReservation200
  Request: CreateReservationMutationRequest
  PathParams: CreateReservationPathParams
  Errors: any
}