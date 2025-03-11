import type { HousingUnitTypePaginated } from '../HousingUnitTypePaginated.ts'
import type { HousingUnitTypeSearchBodyInput } from '../HousingUnitTypeSearchBodyInput.ts'

export type SearchHousingUnitTypesPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchHousingUnitTypesQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchHousingUnitTypes200 = HousingUnitTypePaginated

export type SearchHousingUnitTypesMutationRequest = HousingUnitTypeSearchBodyInput

export type SearchHousingUnitTypesMutationResponse = SearchHousingUnitTypes200

export type SearchHousingUnitTypesMutation = {
  Response: SearchHousingUnitTypes200
  Request: SearchHousingUnitTypesMutationRequest
  PathParams: SearchHousingUnitTypesPathParams
  QueryParams: SearchHousingUnitTypesQueryParams
  Errors: any
}