import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetReservationByIdQueryResponse, GetReservationByIdPathParams } from '../../types/ReservationController/GetReservationById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getReservationById } from '../../client/ReservationService/getReservationById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getReservationByIdQueryKey = ({
  id,
  companyId,
}: {
  id: GetReservationByIdPathParams['id']
  companyId: GetReservationByIdPathParams['companyId']
}) => [{ url: '/company/:companyId/reservation/:id', params: { companyId: companyId, id: id } }] as const

export type GetReservationByIdQueryKey = ReturnType<typeof getReservationByIdQueryKey>

export function getReservationByIdQueryOptions(
  { id, companyId }: { id: GetReservationByIdPathParams['id']; companyId: GetReservationByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getReservationByIdQueryKey({ id, companyId })
  return queryOptions<GetReservationByIdQueryResponse, ResponseErrorConfig<Error>, GetReservationByIdQueryResponse, typeof queryKey>({
    enabled: !!(id && companyId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getReservationById({ id, companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/reservation/:id}
 */
export function useGetReservationById<
  TData = GetReservationByIdQueryResponse,
  TQueryData = GetReservationByIdQueryResponse,
  TQueryKey extends QueryKey = GetReservationByIdQueryKey,
>(
  { id, companyId }: { id: GetReservationByIdPathParams['id']; companyId: GetReservationByIdPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<GetReservationByIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getReservationByIdQueryKey({ id, companyId })

  const query = useQuery({
    ...(getReservationByIdQueryOptions({ id, companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}