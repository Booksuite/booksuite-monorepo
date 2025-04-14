import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchSpecialDatesMutationRequest,
  SearchSpecialDatesMutationResponse,
  SearchSpecialDatesPathParams,
  SearchSpecialDatesQueryParams,
} from '../../types/SpecialDateController/SearchSpecialDates.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchSpecialDates } from '../../client/SpecialDateService/searchSpecialDates.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchSpecialDatesQueryKey = (
  { companyId }: { companyId: SearchSpecialDatesPathParams['companyId'] },
  data: SearchSpecialDatesMutationRequest,
  params?: SearchSpecialDatesQueryParams,
) => ['searchSpecialDates', { companyId: companyId }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchSpecialDatesQueryKey = ReturnType<typeof searchSpecialDatesQueryKey>

export function searchSpecialDatesQueryOptions(
  { companyId }: { companyId: SearchSpecialDatesPathParams['companyId'] },
  data: SearchSpecialDatesMutationRequest,
  params?: SearchSpecialDatesQueryParams,
  config: Partial<RequestConfig<SearchSpecialDatesMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchSpecialDatesQueryKey({ companyId }, data, params)
  return queryOptions<SearchSpecialDatesMutationResponse, ResponseErrorConfig<Error>, SearchSpecialDatesMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchSpecialDates({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/specialDates/search}
 */
export function useSearchSpecialDates<
  TData = SearchSpecialDatesMutationResponse,
  TQueryData = SearchSpecialDatesMutationResponse,
  TQueryKey extends QueryKey = SearchSpecialDatesQueryKey,
>(
  { companyId }: { companyId: SearchSpecialDatesPathParams['companyId'] },
  data: SearchSpecialDatesMutationRequest,
  params?: SearchSpecialDatesQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<SearchSpecialDatesMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchSpecialDatesMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchSpecialDatesQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchSpecialDatesQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}