import type { Offer } from '../Offer.ts'
import type { UpdateOfferDto } from '../UpdateOfferDto.ts'

export type UpdateOfferPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type UpdateOffer200 = Offer

export type UpdateOfferMutationRequest = UpdateOfferDto

export type UpdateOfferMutationResponse = UpdateOffer200

export type UpdateOfferMutation = {
  Response: UpdateOffer200
  Request: UpdateOfferMutationRequest
  PathParams: UpdateOfferPathParams
  Errors: any
}