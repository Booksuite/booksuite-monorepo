import type { RateOptionFull } from '../RateOptionFull.ts'

export type GetRateOptionByIdPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type GetRateOptionById200 = RateOptionFull | null

export type GetRateOptionByIdQueryResponse = GetRateOptionById200

export type GetRateOptionByIdQuery = {
  Response: GetRateOptionById200
  PathParams: GetRateOptionByIdPathParams
  Errors: any
}