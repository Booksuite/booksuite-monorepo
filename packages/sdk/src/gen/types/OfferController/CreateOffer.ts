import type { CreateOfferDto } from '../CreateOfferDto.ts'
import type { Offer } from '../Offer.ts'

export type CreateOfferPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type CreateOffer200 = Offer

export type CreateOfferMutationRequest = CreateOfferDto

export type CreateOfferMutationResponse = CreateOffer200

export type CreateOfferMutation = {
  Response: CreateOffer200
  Request: CreateOfferMutationRequest
  PathParams: CreateOfferPathParams
  Errors: any
}