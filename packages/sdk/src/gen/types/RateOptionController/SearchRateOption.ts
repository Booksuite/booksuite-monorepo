import type { RateOptionPaginated } from '../RateOptionPaginated.ts'
import type { RateOptionSearchBodyInput } from '../RateOptionSearchBodyInput.ts'

export type SearchRateOptionPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchRateOptionQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchRateOption200 = RateOptionPaginated

export type SearchRateOptionMutationRequest = RateOptionSearchBodyInput

export type SearchRateOptionMutationResponse = SearchRateOption200

export type SearchRateOptionMutation = {
  Response: SearchRateOption200
  Request: SearchRateOptionMutationRequest
  PathParams: SearchRateOptionPathParams
  QueryParams: SearchRateOptionQueryParams
  Errors: any
}