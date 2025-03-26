import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchReservationsMutationRequest,
  SearchReservationsMutationResponse,
  SearchReservationsPathParams,
  SearchReservationsQueryParams,
} from '../../types/ReservationController/SearchReservations.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchReservations } from '../../client/ReservationService/searchReservations.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchReservationsQueryKey = (
  { companyId }: { companyId: SearchReservationsPathParams['companyId'] },
  data: SearchReservationsMutationRequest,
  params?: SearchReservationsQueryParams,
) => ['searchReservations', { companyId: companyId }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchReservationsQueryKey = ReturnType<typeof searchReservationsQueryKey>

export function searchReservationsQueryOptions(
  { companyId }: { companyId: SearchReservationsPathParams['companyId'] },
  data: SearchReservationsMutationRequest,
  params?: SearchReservationsQueryParams,
  config: Partial<RequestConfig<SearchReservationsMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchReservationsQueryKey({ companyId }, data, params)
  return queryOptions<SearchReservationsMutationResponse, ResponseErrorConfig<Error>, SearchReservationsMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchReservations({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/reservation/search}
 */
export function useSearchReservations<
  TData = SearchReservationsMutationResponse,
  TQueryData = SearchReservationsMutationResponse,
  TQueryKey extends QueryKey = SearchReservationsQueryKey,
>(
  { companyId }: { companyId: SearchReservationsPathParams['companyId'] },
  data: SearchReservationsMutationRequest,
  params?: SearchReservationsQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<SearchReservationsMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchReservationsMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchReservationsQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchReservationsQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}