/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  SearchCompaniesMutationRequest,
  SearchCompaniesMutationResponse,
  SearchCompaniesQueryParams,
} from '../../types/CompanyController/SearchCompanies.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

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
  return res
}