/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchCompaniesMutationRequest,
  SearchCompaniesMutationResponse,
  SearchCompaniesQueryParams,
} from '../../types/CompanyController/SearchCompanies.ts'

export function getSearchCompaniesUrl() {
  return `/company/search` as const
}

/**
 * {@link /company/search}
 */
export async function searchCompanies(
  data: SearchCompaniesMutationRequest,
  params?: SearchCompaniesQueryParams,
  config: Partial<RequestConfig<SearchCompaniesMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchCompaniesMutationResponse, ResponseErrorConfig<Error>, SearchCompaniesMutationRequest>({
    method: 'POST',
    url: getSearchCompaniesUrl().toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}