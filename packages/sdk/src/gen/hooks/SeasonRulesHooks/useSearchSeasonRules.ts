import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchSeasonRulesMutationRequest,
  SearchSeasonRulesMutationResponse,
  SearchSeasonRulesPathParams,
  SearchSeasonRulesQueryParams,
} from '../../types/SeasonRulesController/SearchSeasonRules.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchSeasonRules } from '../../client/SeasonRulesService/searchSeasonRules.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchSeasonRulesQueryKey = (
  { companyId }: { companyId: SearchSeasonRulesPathParams['companyId'] },
  data: SearchSeasonRulesMutationRequest,
  params?: SearchSeasonRulesQueryParams,
) => ['searchSeasonRules', { companyId: companyId }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchSeasonRulesQueryKey = ReturnType<typeof searchSeasonRulesQueryKey>

export function searchSeasonRulesQueryOptions(
  { companyId }: { companyId: SearchSeasonRulesPathParams['companyId'] },
  data: SearchSeasonRulesMutationRequest,
  params?: SearchSeasonRulesQueryParams,
  config: Partial<RequestConfig<SearchSeasonRulesMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchSeasonRulesQueryKey({ companyId }, data, params)
  return queryOptions<SearchSeasonRulesMutationResponse, ResponseErrorConfig<Error>, SearchSeasonRulesMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchSeasonRules({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/seasonRules/search}
 */
export function useSearchSeasonRules<
  TData = SearchSeasonRulesMutationResponse,
  TQueryData = SearchSeasonRulesMutationResponse,
  TQueryKey extends QueryKey = SearchSeasonRulesQueryKey,
>(
  { companyId }: { companyId: SearchSeasonRulesPathParams['companyId'] },
  data: SearchSeasonRulesMutationRequest,
  params?: SearchSeasonRulesQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<SearchSeasonRulesMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchSeasonRulesMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchSeasonRulesQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchSeasonRulesQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}