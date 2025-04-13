import type { OfferPaginated } from '../OfferPaginated.ts'
import type { OfferSearchBodyInput } from '../OfferSearchBodyInput.ts'

export type SearchOffersPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchOffersQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchOffers200 = OfferPaginated

export type SearchOffersMutationRequest = OfferSearchBodyInput

export type SearchOffersMutationResponse = SearchOffers200

export type SearchOffersMutation = {
  Response: SearchOffers200
  Request: SearchOffersMutationRequest
  PathParams: SearchOffersPathParams
  QueryParams: SearchOffersQueryParams
  Errors: any
}