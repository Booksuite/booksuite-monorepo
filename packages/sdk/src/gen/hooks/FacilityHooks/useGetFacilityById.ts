import client from '@kubb/plugin-client/clients/fetch'
import type { GetFacilityByIdQueryResponse, GetFacilityByIdPathParams } from '../../types/FacilityController/GetFacilityById.ts'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/fetch'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getFacilityById } from '../../client/FacilityService/getFacilityById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getFacilityByIdQueryKey = ({ id }: { id: GetFacilityByIdPathParams['id'] }) => [{ url: '/facility/:id', params: { id: id } }] as const

export type GetFacilityByIdQueryKey = ReturnType<typeof getFacilityByIdQueryKey>

export function getFacilityByIdQueryOptions({ id }: { id: GetFacilityByIdPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getFacilityByIdQueryKey({ id })
  return queryOptions<ResponseConfig<GetFacilityByIdQueryResponse>, ResponseErrorConfig<Error>, ResponseConfig<GetFacilityByIdQueryResponse>, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getFacilityById({ id }, config)
    },
  })
}

/**
 * {@link /facility/:id}
 */
export function useGetFacilityById<
  TData = ResponseConfig<GetFacilityByIdQueryResponse>,
  TQueryData = ResponseConfig<GetFacilityByIdQueryResponse>,
  TQueryKey extends QueryKey = GetFacilityByIdQueryKey,
>(
  { id }: { id: GetFacilityByIdPathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<GetFacilityByIdQueryResponse>, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getFacilityByIdQueryKey({ id })

  const query = useQuery({
    ...(getFacilityByIdQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}