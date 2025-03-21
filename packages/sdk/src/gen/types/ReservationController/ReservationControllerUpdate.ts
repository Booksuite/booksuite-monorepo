import type { Reservation } from '../Reservation.ts'
import type { ReservationUpdateInput } from '../ReservationUpdateInput.ts'

export type ReservationControllerUpdatePathParams = {
  /**
   * @type string
   */
  companyId: string
  /**
   * @type string
   */
  id: string
}

export type ReservationControllerUpdate200 = Reservation

export type ReservationControllerUpdateMutationRequest = ReservationUpdateInput

export type ReservationControllerUpdateMutationResponse = ReservationControllerUpdate200

export type ReservationControllerUpdateMutation = {
  Response: ReservationControllerUpdate200
  Request: ReservationControllerUpdateMutationRequest
  PathParams: ReservationControllerUpdatePathParams
  Errors: any
}