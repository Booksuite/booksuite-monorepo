import type { Offer } from '../Offer.ts'

export type GetOfferByIdPathParams = {
  /**
   * @type string
   */
  id: string
}

export type GetOfferById200 = Offer | null

export type GetOfferByIdQueryResponse = GetOfferById200

export type GetOfferByIdQuery = {
  Response: GetOfferById200
  PathParams: GetOfferByIdPathParams
  Errors: any
}