import type { ReservationConfig } from '../ReservationConfig.ts'

export type GetCompanyReservationConfigPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type GetCompanyReservationConfig200 = ReservationConfig | null

export type GetCompanyReservationConfigQueryResponse = GetCompanyReservationConfig200

export type GetCompanyReservationConfigQuery = {
  Response: GetCompanyReservationConfig200
  PathParams: GetCompanyReservationConfigPathParams
  Errors: any
}