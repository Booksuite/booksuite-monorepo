import client from '@kubb/plugin-client/clients/fetch'
import type {
  SearchCompaniesMutationRequest,
  SearchCompaniesMutationResponse,
  SearchCompaniesQueryParams,
} from '../../types/CompanyController/SearchCompanies.ts'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/fetch'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchCompanies } from '../../client/CompanyService/searchCompanies.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchCompaniesQueryKey = (data: SearchCompaniesMutationRequest, params?: SearchCompaniesQueryParams) =>
  [{ url: '/company/search' }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchCompaniesQueryKey = ReturnType<typeof searchCompaniesQueryKey>

export function searchCompaniesQueryOptions(
  data: SearchCompaniesMutationRequest,
  params?: SearchCompaniesQueryParams,
  config: Partial<RequestConfig<SearchCompaniesMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchCompaniesQueryKey(data, params)
  return queryOptions<
    ResponseConfig<SearchCompaniesMutationResponse>,
    ResponseErrorConfig<Error>,
    ResponseConfig<SearchCompaniesMutationResponse>,
    typeof queryKey
  >({
    enabled: !!data,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchCompanies(data, params, config)
    },
  })
}

/**
 * {@link /company/search}
 */
export function useSearchCompanies<
  TData = ResponseConfig<SearchCompaniesMutationResponse>,
  TQueryData = ResponseConfig<SearchCompaniesMutationResponse>,
  TQueryKey extends QueryKey = SearchCompaniesQueryKey,
>(
  data: SearchCompaniesMutationRequest,
  params?: SearchCompaniesQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<SearchCompaniesMutationResponse>, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchCompaniesMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchCompaniesQueryKey(data, params)

  const query = useQuery({
    ...(searchCompaniesQueryOptions(data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}