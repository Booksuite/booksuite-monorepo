import type { CompanyPaginated } from '../CompanyPaginated.ts'
import type { CompanySearchBodyInput } from '../CompanySearchBodyInput.ts'

export type SearchCompaniesQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchCompanies200 = CompanyPaginated

export type SearchCompaniesMutationRequest = CompanySearchBodyInput

export type SearchCompaniesMutationResponse = SearchCompanies200

export type SearchCompaniesMutation = {
  Response: SearchCompanies200
  Request: SearchCompaniesMutationRequest
  QueryParams: SearchCompaniesQueryParams
  Errors: any
}