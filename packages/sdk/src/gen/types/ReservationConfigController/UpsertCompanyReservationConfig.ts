import type { ReservationConfig } from '../ReservationConfig.ts'
import type { ReservationConfigInput } from '../ReservationConfigInput.ts'

export type UpsertCompanyReservationConfigPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type UpsertCompanyReservationConfig200 = ReservationConfig

export type UpsertCompanyReservationConfigMutationRequest = ReservationConfigInput

export type UpsertCompanyReservationConfigMutationResponse = UpsertCompanyReservationConfig200

export type UpsertCompanyReservationConfigMutation = {
  Response: UpsertCompanyReservationConfig200
  Request: UpsertCompanyReservationConfigMutationRequest
  PathParams: UpsertCompanyReservationConfigPathParams
  Errors: any
}