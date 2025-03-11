import client from '@kubb/plugin-client/clients/fetch'
import type { GetCompanyAgePolicyQueryResponse, GetCompanyAgePolicyPathParams } from '../../types/AgePolicyController/GetCompanyAgePolicy.ts'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/fetch'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCompanyAgePolicy } from '../../client/AgePolicyService/getCompanyAgePolicy.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCompanyAgePolicyQueryKey = ({ companyId }: { companyId: GetCompanyAgePolicyPathParams['companyId'] }) =>
  [{ url: '/company/:companyId/agePolicy', params: { companyId: companyId } }] as const

export type GetCompanyAgePolicyQueryKey = ReturnType<typeof getCompanyAgePolicyQueryKey>

export function getCompanyAgePolicyQueryOptions(
  { companyId }: { companyId: GetCompanyAgePolicyPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getCompanyAgePolicyQueryKey({ companyId })
  return queryOptions<
    ResponseConfig<GetCompanyAgePolicyQueryResponse>,
    ResponseErrorConfig<Error>,
    ResponseConfig<GetCompanyAgePolicyQueryResponse>,
    typeof queryKey
  >({
    enabled: !!companyId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCompanyAgePolicy({ companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/agePolicy}
 */
export function useGetCompanyAgePolicy<
  TData = ResponseConfig<GetCompanyAgePolicyQueryResponse>,
  TQueryData = ResponseConfig<GetCompanyAgePolicyQueryResponse>,
  TQueryKey extends QueryKey = GetCompanyAgePolicyQueryKey,
>(
  { companyId }: { companyId: GetCompanyAgePolicyPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<GetCompanyAgePolicyQueryResponse>, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCompanyAgePolicyQueryKey({ companyId })

  const query = useQuery({
    ...(getCompanyAgePolicyQueryOptions({ companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}