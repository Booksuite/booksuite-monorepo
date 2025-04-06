import type { ReservationOptionFull } from '../ReservationOptionFull.ts'
import type { ReservationOptionUpdateInput } from '../ReservationOptionUpdateInput.ts'

export type ReservationOptionsControllerUpdatePathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type ReservationOptionsControllerUpdate200 = ReservationOptionFull

export type ReservationOptionsControllerUpdateMutationRequest = ReservationOptionUpdateInput

export type ReservationOptionsControllerUpdateMutationResponse = ReservationOptionsControllerUpdate200

export type ReservationOptionsControllerUpdateMutation = {
  Response: ReservationOptionsControllerUpdate200
  Request: ReservationOptionsControllerUpdateMutationRequest
  PathParams: ReservationOptionsControllerUpdatePathParams
  Errors: any
}