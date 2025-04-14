import type { SpecialDatePaginated } from '../SpecialDatePaginated.ts'
import type { SpecialDateSearchBodyInput } from '../SpecialDateSearchBodyInput.ts'

export type SearchSpecialDatesPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchSpecialDatesQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchSpecialDates200 = SpecialDatePaginated

export type SearchSpecialDatesMutationRequest = SpecialDateSearchBodyInput

export type SearchSpecialDatesMutationResponse = SearchSpecialDates200

export type SearchSpecialDatesMutation = {
  Response: SearchSpecialDates200
  Request: SearchSpecialDatesMutationRequest
  PathParams: SearchSpecialDatesPathParams
  QueryParams: SearchSpecialDatesQueryParams
  Errors: any
}