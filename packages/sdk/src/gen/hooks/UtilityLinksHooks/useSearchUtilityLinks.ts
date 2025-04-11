import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchUtilityLinksMutationRequest,
  SearchUtilityLinksMutationResponse,
  SearchUtilityLinksPathParams,
  SearchUtilityLinksQueryParams,
} from '../../types/UtilityLinksController/SearchUtilityLinks.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchUtilityLinks } from '../../client/UtilityLinksService/searchUtilityLinks.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchUtilityLinksQueryKey = (
  { companyId }: { companyId: SearchUtilityLinksPathParams['companyId'] },
  data: SearchUtilityLinksMutationRequest,
  params?: SearchUtilityLinksQueryParams,
) => ['searchUtilityLinks', { companyId: companyId }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchUtilityLinksQueryKey = ReturnType<typeof searchUtilityLinksQueryKey>

export function searchUtilityLinksQueryOptions(
  { companyId }: { companyId: SearchUtilityLinksPathParams['companyId'] },
  data: SearchUtilityLinksMutationRequest,
  params?: SearchUtilityLinksQueryParams,
  config: Partial<RequestConfig<SearchUtilityLinksMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchUtilityLinksQueryKey({ companyId }, data, params)
  return queryOptions<SearchUtilityLinksMutationResponse, ResponseErrorConfig<Error>, SearchUtilityLinksMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchUtilityLinks({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/utilityLinks/search}
 */
export function useSearchUtilityLinks<
  TData = SearchUtilityLinksMutationResponse,
  TQueryData = SearchUtilityLinksMutationResponse,
  TQueryKey extends QueryKey = SearchUtilityLinksQueryKey,
>(
  { companyId }: { companyId: SearchUtilityLinksPathParams['companyId'] },
  data: SearchUtilityLinksMutationRequest,
  params?: SearchUtilityLinksQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<SearchUtilityLinksMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchUtilityLinksMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchUtilityLinksQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchUtilityLinksQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}