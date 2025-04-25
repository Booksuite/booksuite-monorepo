import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetOfferByIdQueryResponse, GetOfferByIdPathParams } from '../../types/OfferController/GetOfferById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getOfferById } from '../../client/OfferService/getOfferById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getOfferByIdQueryKey = ({ id, companyId }: { id: GetOfferByIdPathParams['id']; companyId: GetOfferByIdPathParams['companyId'] }) =>
  ['getOfferById', { companyId: companyId, id: id }] as const

export type GetOfferByIdQueryKey = ReturnType<typeof getOfferByIdQueryKey>

export function getOfferByIdQueryOptions(
  { id, companyId }: { id: GetOfferByIdPathParams['id']; companyId: GetOfferByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getOfferByIdQueryKey({ id, companyId })
  return queryOptions<GetOfferByIdQueryResponse, ResponseErrorConfig<Error>, GetOfferByIdQueryResponse, typeof queryKey>({
    enabled: !!(id && companyId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getOfferById({ id, companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/offers/:id}
 */
export function useGetOfferById<TData = GetOfferByIdQueryResponse, TQueryData = GetOfferByIdQueryResponse, TQueryKey extends QueryKey = GetOfferByIdQueryKey>(
  { id, companyId }: { id: GetOfferByIdPathParams['id']; companyId: GetOfferByIdPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<GetOfferByIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getOfferByIdQueryKey({ id, companyId })

  const query = useQuery({
    ...(getOfferByIdQueryOptions({ id, companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}