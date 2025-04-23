import type { OfferFull } from '../OfferFull.ts'

export type GetOfferByIdPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type GetOfferById200 = OfferFull | null

export type GetOfferByIdQueryResponse = GetOfferById200

export type GetOfferByIdQuery = {
  Response: GetOfferById200
  PathParams: GetOfferByIdPathParams
  Errors: any
}