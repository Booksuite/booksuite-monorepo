import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetSpecialDateByIdQueryResponse, GetSpecialDateByIdPathParams } from '../../types/SpecialDateController/GetSpecialDateById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getSpecialDateById } from '../../client/SpecialDateService/getSpecialDateById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getSpecialDateByIdQueryKey = ({ id }: { id: GetSpecialDateByIdPathParams['id'] }) =>
  ['getSpecialDateById', { companyId: companyId, id: id }] as const

export type GetSpecialDateByIdQueryKey = ReturnType<typeof getSpecialDateByIdQueryKey>

export function getSpecialDateByIdQueryOptions(
  { id }: { id: GetSpecialDateByIdPathParams['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getSpecialDateByIdQueryKey({ id })
  return queryOptions<GetSpecialDateByIdQueryResponse, ResponseErrorConfig<Error>, GetSpecialDateByIdQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getSpecialDateById({ id }, config)
    },
  })
}

/**
 * {@link /company/:companyId/specialDates/:id}
 */
export function useGetSpecialDateById<
  TData = GetSpecialDateByIdQueryResponse,
  TQueryData = GetSpecialDateByIdQueryResponse,
  TQueryKey extends QueryKey = GetSpecialDateByIdQueryKey,
>(
  { id }: { id: GetSpecialDateByIdPathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<GetSpecialDateByIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getSpecialDateByIdQueryKey({ id })

  const query = useQuery({
    ...(getSpecialDateByIdQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}