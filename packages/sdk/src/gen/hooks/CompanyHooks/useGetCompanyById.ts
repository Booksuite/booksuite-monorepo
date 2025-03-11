import client from '@kubb/plugin-client/clients/fetch'
import type { GetCompanyByIdQueryResponse, GetCompanyByIdPathParams } from '../../types/CompanyController/GetCompanyById.ts'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/fetch'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCompanyById } from '../../client/CompanyService/getCompanyById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCompanyByIdQueryKey = ({ id }: { id: GetCompanyByIdPathParams['id'] }) => [{ url: '/company/:id', params: { id: id } }] as const

export type GetCompanyByIdQueryKey = ReturnType<typeof getCompanyByIdQueryKey>

export function getCompanyByIdQueryOptions({ id }: { id: GetCompanyByIdPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getCompanyByIdQueryKey({ id })
  return queryOptions<ResponseConfig<GetCompanyByIdQueryResponse>, ResponseErrorConfig<Error>, ResponseConfig<GetCompanyByIdQueryResponse>, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCompanyById({ id }, config)
    },
  })
}

/**
 * {@link /company/:id}
 */
export function useGetCompanyById<
  TData = ResponseConfig<GetCompanyByIdQueryResponse>,
  TQueryData = ResponseConfig<GetCompanyByIdQueryResponse>,
  TQueryKey extends QueryKey = GetCompanyByIdQueryKey,
>(
  { id }: { id: GetCompanyByIdPathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<GetCompanyByIdQueryResponse>, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCompanyByIdQueryKey({ id })

  const query = useQuery({
    ...(getCompanyByIdQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}