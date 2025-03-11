import type { FacilityPaginated } from '../FacilityPaginated.ts'
import type { FacilitySearchBodyInput } from '../FacilitySearchBodyInput.ts'

export type SearchFacilitiesQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchFacilities200 = FacilityPaginated

export type SearchFacilitiesMutationRequest = FacilitySearchBodyInput

export type SearchFacilitiesMutationResponse = SearchFacilities200

export type SearchFacilitiesMutation = {
  Response: SearchFacilities200
  Request: SearchFacilitiesMutationRequest
  QueryParams: SearchFacilitiesQueryParams
  Errors: any
}