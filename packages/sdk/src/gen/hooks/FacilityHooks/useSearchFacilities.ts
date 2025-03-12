import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchFacilitiesMutationRequest,
  SearchFacilitiesMutationResponse,
  SearchFacilitiesQueryParams,
} from '../../types/FacilityController/SearchFacilities.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchFacilities } from '../../client/FacilityService/searchFacilities.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchFacilitiesQueryKey = (data: SearchFacilitiesMutationRequest, params?: SearchFacilitiesQueryParams) =>
  [{ url: '/facility/search' }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchFacilitiesQueryKey = ReturnType<typeof searchFacilitiesQueryKey>

export function searchFacilitiesQueryOptions(
  data: SearchFacilitiesMutationRequest,
  params?: SearchFacilitiesQueryParams,
  config: Partial<RequestConfig<SearchFacilitiesMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchFacilitiesQueryKey(data, params)
  return queryOptions<SearchFacilitiesMutationResponse, ResponseErrorConfig<Error>, SearchFacilitiesMutationResponse, typeof queryKey>({
    enabled: !!data,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchFacilities(data, params, config)
    },
  })
}

/**
 * {@link /facility/search}
 */
export function useSearchFacilities<
  TData = SearchFacilitiesMutationResponse,
  TQueryData = SearchFacilitiesMutationResponse,
  TQueryKey extends QueryKey = SearchFacilitiesQueryKey,
>(
  data: SearchFacilitiesMutationRequest,
  params?: SearchFacilitiesQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<SearchFacilitiesMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchFacilitiesMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchFacilitiesQueryKey(data, params)

  const query = useQuery({
    ...(searchFacilitiesQueryOptions(data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}