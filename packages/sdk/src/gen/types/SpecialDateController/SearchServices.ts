import type { SpecialDatePaginated } from '../SpecialDatePaginated.ts'
import type { SpecialDateSearchBodyInput } from '../SpecialDateSearchBodyInput.ts'

export type SearchServicesPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchServicesQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchServices200 = SpecialDatePaginated

export type SearchServicesMutationRequest = SpecialDateSearchBodyInput

export type SearchServicesMutationResponse = SearchServices200

export type SearchServicesMutation = {
  Response: SearchServices200
  Request: SearchServicesMutationRequest
  PathParams: SearchServicesPathParams
  QueryParams: SearchServicesQueryParams
  Errors: any
}