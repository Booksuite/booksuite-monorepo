import client from '@kubb/plugin-client/clients/fetch'
import type {
  GetCompanyCancellationPolicyQueryResponse,
  GetCompanyCancellationPolicyPathParams,
} from '../../types/CancellationPolicyController/GetCompanyCancellationPolicy.ts'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/fetch'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCompanyCancellationPolicy } from '../../client/CancellationPolicyService/getCompanyCancellationPolicy.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCompanyCancellationPolicyQueryKey = ({ companyId }: { companyId: GetCompanyCancellationPolicyPathParams['companyId'] }) =>
  [{ url: '/company/:companyId/cancellationPolicy', params: { companyId: companyId } }] as const

export type GetCompanyCancellationPolicyQueryKey = ReturnType<typeof getCompanyCancellationPolicyQueryKey>

export function getCompanyCancellationPolicyQueryOptions(
  { companyId }: { companyId: GetCompanyCancellationPolicyPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getCompanyCancellationPolicyQueryKey({ companyId })
  return queryOptions<
    ResponseConfig<GetCompanyCancellationPolicyQueryResponse>,
    ResponseErrorConfig<Error>,
    ResponseConfig<GetCompanyCancellationPolicyQueryResponse>,
    typeof queryKey
  >({
    enabled: !!companyId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCompanyCancellationPolicy({ companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/cancellationPolicy}
 */
export function useGetCompanyCancellationPolicy<
  TData = ResponseConfig<GetCompanyCancellationPolicyQueryResponse>,
  TQueryData = ResponseConfig<GetCompanyCancellationPolicyQueryResponse>,
  TQueryKey extends QueryKey = GetCompanyCancellationPolicyQueryKey,
>(
  { companyId }: { companyId: GetCompanyCancellationPolicyPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<GetCompanyCancellationPolicyQueryResponse>, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCompanyCancellationPolicyQueryKey({ companyId })

  const query = useQuery({
    ...(getCompanyCancellationPolicyQueryOptions({ companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}