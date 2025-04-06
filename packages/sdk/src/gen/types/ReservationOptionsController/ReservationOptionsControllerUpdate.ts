import type { ReservationOptionFull } from '../ReservationOptionFull.ts'
import type { ReservationOptionInput } from '../ReservationOptionInput.ts'

export type ReservationOptionsControllerUpdatePathParams = {
  /**
   * @type string
   */
  id: string
}

export type ReservationOptionsControllerUpdate200 = ReservationOptionFull

export type ReservationOptionsControllerUpdateMutationRequest = ReservationOptionInput

export type ReservationOptionsControllerUpdateMutationResponse = ReservationOptionsControllerUpdate200

export type ReservationOptionsControllerUpdateMutation = {
  Response: ReservationOptionsControllerUpdate200
  Request: ReservationOptionsControllerUpdateMutationRequest
  PathParams: ReservationOptionsControllerUpdatePathParams
  Errors: any
}