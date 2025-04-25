import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchRateOptionMutationRequest,
  SearchRateOptionMutationResponse,
  SearchRateOptionPathParams,
  SearchRateOptionQueryParams,
} from '../../types/RateOptionController/SearchRateOption.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchRateOption } from '../../client/RateOptionService/searchRateOption.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchRateOptionQueryKey = (
  { companyId }: { companyId: SearchRateOptionPathParams['companyId'] },
  data: SearchRateOptionMutationRequest,
  params?: SearchRateOptionQueryParams,
) => ['searchRateOption', { companyId: companyId }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchRateOptionQueryKey = ReturnType<typeof searchRateOptionQueryKey>

export function searchRateOptionQueryOptions(
  { companyId }: { companyId: SearchRateOptionPathParams['companyId'] },
  data: SearchRateOptionMutationRequest,
  params?: SearchRateOptionQueryParams,
  config: Partial<RequestConfig<SearchRateOptionMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchRateOptionQueryKey({ companyId }, data, params)
  return queryOptions<SearchRateOptionMutationResponse, ResponseErrorConfig<Error>, SearchRateOptionMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchRateOption({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/rateOption/search}
 */
export function useSearchRateOption<
  TData = SearchRateOptionMutationResponse,
  TQueryData = SearchRateOptionMutationResponse,
  TQueryKey extends QueryKey = SearchRateOptionQueryKey,
>(
  { companyId }: { companyId: SearchRateOptionPathParams['companyId'] },
  data: SearchRateOptionMutationRequest,
  params?: SearchRateOptionQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<SearchRateOptionMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchRateOptionMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchRateOptionQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchRateOptionQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}