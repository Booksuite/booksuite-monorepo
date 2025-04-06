import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  ReservationOptionsControllerGetByIdQueryResponse,
  ReservationOptionsControllerGetByIdPathParams,
} from '../../types/ReservationOptionsController/ReservationOptionsControllerGetById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { reservationOptionsControllerGetById } from '../../client/ReservationOptionsService/reservationOptionsControllerGetById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const reservationOptionsControllerGetByIdQueryKey = ({ id }: { id: ReservationOptionsControllerGetByIdPathParams['id'] }) =>
  ['ReservationOptionsController_getById', { companyId: companyId, id: id }] as const

export type ReservationOptionsControllerGetByIdQueryKey = ReturnType<typeof reservationOptionsControllerGetByIdQueryKey>

export function reservationOptionsControllerGetByIdQueryOptions(
  { id }: { id: ReservationOptionsControllerGetByIdPathParams['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = reservationOptionsControllerGetByIdQueryKey({ id })
  return queryOptions<
    ReservationOptionsControllerGetByIdQueryResponse,
    ResponseErrorConfig<Error>,
    ReservationOptionsControllerGetByIdQueryResponse,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return reservationOptionsControllerGetById({ id }, config)
    },
  })
}

/**
 * {@link /company/:companyId/reservationOptions/:id}
 */
export function useReservationOptionsControllerGetById<
  TData = ReservationOptionsControllerGetByIdQueryResponse,
  TQueryData = ReservationOptionsControllerGetByIdQueryResponse,
  TQueryKey extends QueryKey = ReservationOptionsControllerGetByIdQueryKey,
>(
  { id }: { id: ReservationOptionsControllerGetByIdPathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<ReservationOptionsControllerGetByIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? reservationOptionsControllerGetByIdQueryKey({ id })

  const query = useQuery({
    ...(reservationOptionsControllerGetByIdQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}