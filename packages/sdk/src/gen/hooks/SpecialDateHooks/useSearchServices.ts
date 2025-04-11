import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchServicesMutationRequest,
  SearchServicesMutationResponse,
  SearchServicesPathParams,
  SearchServicesQueryParams,
} from '../../types/SpecialDateController/SearchServices.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchServices } from '../../client/SpecialDateService/searchServices.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchServicesQueryKey = (
  { companyId }: { companyId: SearchServicesPathParams['companyId'] },
  data: SearchServicesMutationRequest,
  params?: SearchServicesQueryParams,
) => ['searchServices', { companyId: companyId }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchServicesQueryKey = ReturnType<typeof searchServicesQueryKey>

export function searchServicesQueryOptions(
  { companyId }: { companyId: SearchServicesPathParams['companyId'] },
  data: SearchServicesMutationRequest,
  params?: SearchServicesQueryParams,
  config: Partial<RequestConfig<SearchServicesMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchServicesQueryKey({ companyId }, data, params)
  return queryOptions<SearchServicesMutationResponse, ResponseErrorConfig<Error>, SearchServicesMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchServices({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/specialDates/search}
 */
export function useSearchServices<
  TData = SearchServicesMutationResponse,
  TQueryData = SearchServicesMutationResponse,
  TQueryKey extends QueryKey = SearchServicesQueryKey,
>(
  { companyId }: { companyId: SearchServicesPathParams['companyId'] },
  data: SearchServicesMutationRequest,
  params?: SearchServicesQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<SearchServicesMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchServicesMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchServicesQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchServicesQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}