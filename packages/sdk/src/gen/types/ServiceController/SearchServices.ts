import type { ServicePaginated } from '../ServicePaginated.ts'
import type { ServiceSearchBodyInput } from '../ServiceSearchBodyInput.ts'

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

export type SearchServices200 = ServicePaginated

export type SearchServicesMutationRequest = ServiceSearchBodyInput

export type SearchServicesMutationResponse = SearchServices200

export type SearchServicesMutation = {
  Response: SearchServices200
  Request: SearchServicesMutationRequest
  PathParams: SearchServicesPathParams
  QueryParams: SearchServicesQueryParams
  Errors: any
}