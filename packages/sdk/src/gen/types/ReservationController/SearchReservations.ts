import type { ReservationPaginated } from '../ReservationPaginated.ts'
import type { ReservationSearchBodyInput } from '../ReservationSearchBodyInput.ts'

export type SearchReservationsPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchReservationsQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchReservations200 = ReservationPaginated

export type SearchReservationsMutationRequest = ReservationSearchBodyInput

export type SearchReservationsMutationResponse = SearchReservations200

export type SearchReservationsMutation = {
  Response: SearchReservations200
  Request: SearchReservationsMutationRequest
  PathParams: SearchReservationsPathParams
  QueryParams: SearchReservationsQueryParams
  Errors: any
}