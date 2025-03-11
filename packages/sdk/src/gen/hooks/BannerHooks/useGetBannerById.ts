import client from '@kubb/plugin-client/clients/fetch'
import type { GetBannerByIdQueryResponse, GetBannerByIdPathParams } from '../../types/BannerController/GetBannerById.ts'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/fetch'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getBannerById } from '../../client/BannerService/getBannerById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getBannerByIdQueryKey = ({ id, companyId }: { id: GetBannerByIdPathParams['id']; companyId: GetBannerByIdPathParams['companyId'] }) =>
  [{ url: '/company/:companyId/banner/:id', params: { companyId: companyId, id: id } }] as const

export type GetBannerByIdQueryKey = ReturnType<typeof getBannerByIdQueryKey>

export function getBannerByIdQueryOptions(
  { id, companyId }: { id: GetBannerByIdPathParams['id']; companyId: GetBannerByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getBannerByIdQueryKey({ id, companyId })
  return queryOptions<ResponseConfig<GetBannerByIdQueryResponse>, ResponseErrorConfig<Error>, ResponseConfig<GetBannerByIdQueryResponse>, typeof queryKey>({
    enabled: !!(id && companyId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getBannerById({ id, companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/banner/:id}
 */
export function useGetBannerById<
  TData = ResponseConfig<GetBannerByIdQueryResponse>,
  TQueryData = ResponseConfig<GetBannerByIdQueryResponse>,
  TQueryKey extends QueryKey = GetBannerByIdQueryKey,
>(
  { id, companyId }: { id: GetBannerByIdPathParams['id']; companyId: GetBannerByIdPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<GetBannerByIdQueryResponse>, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getBannerByIdQueryKey({ id, companyId })

  const query = useQuery({
    ...(getBannerByIdQueryOptions({ id, companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}