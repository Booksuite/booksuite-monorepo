import type { ReservationOption } from '../ReservationOption.ts'
import type { ReservationOptionInput } from '../ReservationOptionInput.ts'

export type ReservationOptionsControllerCreatePathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type ReservationOptionsControllerCreate200 = ReservationOption

export type ReservationOptionsControllerCreateMutationRequest = ReservationOptionInput

export type ReservationOptionsControllerCreateMutationResponse = ReservationOptionsControllerCreate200

export type ReservationOptionsControllerCreateMutation = {
  Response: ReservationOptionsControllerCreate200
  Request: ReservationOptionsControllerCreateMutationRequest
  PathParams: ReservationOptionsControllerCreatePathParams
  Errors: any
}