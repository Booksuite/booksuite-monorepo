import type { RateOptionFull } from '../RateOptionFull.ts'
import type { RateOptionUpdateInput } from '../RateOptionUpdateInput.ts'

export type UpdateRateOptionPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type UpdateRateOption200 = RateOptionFull

export type UpdateRateOptionMutationRequest = RateOptionUpdateInput

export type UpdateRateOptionMutationResponse = UpdateRateOption200

export type UpdateRateOptionMutation = {
  Response: UpdateRateOption200
  Request: UpdateRateOptionMutationRequest
  PathParams: UpdateRateOptionPathParams
  Errors: any
}