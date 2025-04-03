import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchReservationOptionMutationRequest,
  SearchReservationOptionMutationResponse,
  SearchReservationOptionPathParams,
  SearchReservationOptionQueryParams,
} from '../../types/ReservationOptionsController/SearchReservationOption.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchReservationOption } from '../../client/ReservationOptionsService/searchReservationOption.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchReservationOptionQueryKey = (
  { companyId }: { companyId: SearchReservationOptionPathParams['companyId'] },
  data: SearchReservationOptionMutationRequest,
  params?: SearchReservationOptionQueryParams,
) => ['searchReservationOption', { companyId: companyId }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchReservationOptionQueryKey = ReturnType<typeof searchReservationOptionQueryKey>

export function searchReservationOptionQueryOptions(
  { companyId }: { companyId: SearchReservationOptionPathParams['companyId'] },
  data: SearchReservationOptionMutationRequest,
  params?: SearchReservationOptionQueryParams,
  config: Partial<RequestConfig<SearchReservationOptionMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchReservationOptionQueryKey({ companyId }, data, params)
  return queryOptions<SearchReservationOptionMutationResponse, ResponseErrorConfig<Error>, SearchReservationOptionMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchReservationOption({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/reservationOptions/search}
 */
export function useSearchReservationOption<
  TData = SearchReservationOptionMutationResponse,
  TQueryData = SearchReservationOptionMutationResponse,
  TQueryKey extends QueryKey = SearchReservationOptionQueryKey,
>(
  { companyId }: { companyId: SearchReservationOptionPathParams['companyId'] },
  data: SearchReservationOptionMutationRequest,
  params?: SearchReservationOptionQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<SearchReservationOptionMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchReservationOptionMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchReservationOptionQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchReservationOptionQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}