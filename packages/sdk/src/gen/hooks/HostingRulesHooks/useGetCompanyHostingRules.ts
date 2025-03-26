import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetCompanyHostingRulesQueryResponse, GetCompanyHostingRulesPathParams } from '../../types/HostingRulesController/GetCompanyHostingRules.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCompanyHostingRules } from '../../client/HostingRulesService/getCompanyHostingRules.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCompanyHostingRulesQueryKey = ({ companyId }: { companyId: GetCompanyHostingRulesPathParams['companyId'] }) =>
  ['getCompanyHostingRules', { companyId: companyId }] as const

export type GetCompanyHostingRulesQueryKey = ReturnType<typeof getCompanyHostingRulesQueryKey>

export function getCompanyHostingRulesQueryOptions(
  { companyId }: { companyId: GetCompanyHostingRulesPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getCompanyHostingRulesQueryKey({ companyId })
  return queryOptions<GetCompanyHostingRulesQueryResponse, ResponseErrorConfig<Error>, GetCompanyHostingRulesQueryResponse, typeof queryKey>({
    enabled: !!companyId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCompanyHostingRules({ companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/hostingRules}
 */
export function useGetCompanyHostingRules<
  TData = GetCompanyHostingRulesQueryResponse,
  TQueryData = GetCompanyHostingRulesQueryResponse,
  TQueryKey extends QueryKey = GetCompanyHostingRulesQueryKey,
>(
  { companyId }: { companyId: GetCompanyHostingRulesPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<GetCompanyHostingRulesQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCompanyHostingRulesQueryKey({ companyId })

  const query = useQuery({
    ...(getCompanyHostingRulesQueryOptions({ companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
