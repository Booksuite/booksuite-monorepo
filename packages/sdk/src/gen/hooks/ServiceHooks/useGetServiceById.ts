import client from '@kubb/plugin-client/clients/fetch'
import type { GetServiceByIdQueryResponse, GetServiceByIdPathParams } from '../../types/ServiceController/GetServiceById.ts'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/fetch'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getServiceById } from '../../client/ServiceService/getServiceById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getServiceByIdQueryKey = ({ id, companyId }: { id: GetServiceByIdPathParams['id']; companyId: GetServiceByIdPathParams['companyId'] }) =>
  [{ url: '/company/:companyId/service/:id', params: { companyId: companyId, id: id } }] as const

export type GetServiceByIdQueryKey = ReturnType<typeof getServiceByIdQueryKey>

export function getServiceByIdQueryOptions(
  { id, companyId }: { id: GetServiceByIdPathParams['id']; companyId: GetServiceByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getServiceByIdQueryKey({ id, companyId })
  return queryOptions<ResponseConfig<GetServiceByIdQueryResponse>, ResponseErrorConfig<Error>, ResponseConfig<GetServiceByIdQueryResponse>, typeof queryKey>({
    enabled: !!(id && companyId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getServiceById({ id, companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/service/:id}
 */
export function useGetServiceById<
  TData = ResponseConfig<GetServiceByIdQueryResponse>,
  TQueryData = ResponseConfig<GetServiceByIdQueryResponse>,
  TQueryKey extends QueryKey = GetServiceByIdQueryKey,
>(
  { id, companyId }: { id: GetServiceByIdPathParams['id']; companyId: GetServiceByIdPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<GetServiceByIdQueryResponse>, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getServiceByIdQueryKey({ id, companyId })

  const query = useQuery({
    ...(getServiceByIdQueryOptions({ id, companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}