import type { ReservationOptionPaginated } from '../ReservationOptionPaginated.ts'
import type { ReservationOptionSearchBodyInput } from '../ReservationOptionSearchBodyInput.ts'

export type SearchReservationOptionPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchReservationOptionQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchReservationOption200 = ReservationOptionPaginated

export type SearchReservationOptionMutationRequest = ReservationOptionSearchBodyInput

export type SearchReservationOptionMutationResponse = SearchReservationOption200

export type SearchReservationOptionMutation = {
  Response: SearchReservationOption200
  Request: SearchReservationOptionMutationRequest
  PathParams: SearchReservationOptionPathParams
  QueryParams: SearchReservationOptionQueryParams
  Errors: any
}