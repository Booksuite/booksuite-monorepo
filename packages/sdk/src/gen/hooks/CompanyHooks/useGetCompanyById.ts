import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetCompanyByIdQueryResponse, GetCompanyByIdPathParams } from '../../types/CompanyController/GetCompanyById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCompanyById } from '../../client/CompanyService/getCompanyById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCompanyByIdQueryKey = ({ id }: { id: GetCompanyByIdPathParams['id'] }) => [{ url: '/company/:id', params: { id: id } }] as const

export type GetCompanyByIdQueryKey = ReturnType<typeof getCompanyByIdQueryKey>

export function getCompanyByIdQueryOptions({ id }: { id: GetCompanyByIdPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getCompanyByIdQueryKey({ id })
  return queryOptions<GetCompanyByIdQueryResponse, ResponseErrorConfig<Error>, GetCompanyByIdQueryResponse, typeof queryKey>({
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
  TData = GetCompanyByIdQueryResponse,
  TQueryData = GetCompanyByIdQueryResponse,
  TQueryKey extends QueryKey = GetCompanyByIdQueryKey,
>(
  { id }: { id: GetCompanyByIdPathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<GetCompanyByIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
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