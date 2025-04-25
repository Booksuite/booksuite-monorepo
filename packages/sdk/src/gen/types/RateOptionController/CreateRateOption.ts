import type { RateOption } from '../RateOption.ts'
import type { RateOptionInput } from '../RateOptionInput.ts'

export type CreateRateOptionPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type CreateRateOption200 = RateOption

export type CreateRateOptionMutationRequest = RateOptionInput

export type CreateRateOptionMutationResponse = CreateRateOption200

export type CreateRateOptionMutation = {
  Response: CreateRateOption200
  Request: CreateRateOptionMutationRequest
  PathParams: CreateRateOptionPathParams
  Errors: any
}