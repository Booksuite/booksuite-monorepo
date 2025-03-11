import type { ReservationFull } from '../ReservationFull.ts'

export type GetReservationByIdPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type GetReservationById200 = ReservationFull | null

export type GetReservationByIdQueryResponse = GetReservationById200

export type GetReservationByIdQuery = {
  Response: GetReservationById200
  PathParams: GetReservationByIdPathParams
  Errors: any
}