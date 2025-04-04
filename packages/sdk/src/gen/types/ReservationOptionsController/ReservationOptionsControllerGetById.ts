import type { ReservationOptionFull } from '../ReservationOptionFull.ts'

export type ReservationOptionsControllerGetByIdPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type ReservationOptionsControllerGetById200 = ReservationOptionFull | null

export type ReservationOptionsControllerGetByIdQueryResponse = ReservationOptionsControllerGetById200

export type ReservationOptionsControllerGetByIdQuery = {
  Response: ReservationOptionsControllerGetById200
  PathParams: ReservationOptionsControllerGetByIdPathParams
  Errors: any
}