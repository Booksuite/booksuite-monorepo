import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetMediaByIdQueryResponse, GetMediaByIdPathParams } from '../../types/MediaController/GetMediaById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getMediaById } from '../../client/MediaService/getMediaById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getMediaByIdQueryKey = ({ id, companyId }: { id: GetMediaByIdPathParams['id']; companyId: GetMediaByIdPathParams['companyId'] }) =>
  ['getMediaById', { companyId: companyId, id: id }] as const

export type GetMediaByIdQueryKey = ReturnType<typeof getMediaByIdQueryKey>

export function getMediaByIdQueryOptions(
  { id, companyId }: { id: GetMediaByIdPathParams['id']; companyId: GetMediaByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getMediaByIdQueryKey({ id, companyId })
  return queryOptions<GetMediaByIdQueryResponse, ResponseErrorConfig<Error>, GetMediaByIdQueryResponse, typeof queryKey>({
    enabled: !!(id && companyId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getMediaById({ id, companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/media/:id}
 */
export function useGetMediaById<TData = GetMediaByIdQueryResponse, TQueryData = GetMediaByIdQueryResponse, TQueryKey extends QueryKey = GetMediaByIdQueryKey>(
  { id, companyId }: { id: GetMediaByIdPathParams['id']; companyId: GetMediaByIdPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<GetMediaByIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getMediaByIdQueryKey({ id, companyId })

  const query = useQuery({
    ...(getMediaByIdQueryOptions({ id, companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}