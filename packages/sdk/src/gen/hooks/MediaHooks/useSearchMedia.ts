import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchMediaMutationRequest,
  SearchMediaMutationResponse,
  SearchMediaPathParams,
  SearchMediaQueryParams,
} from '../../types/MediaController/SearchMedia.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchMedia } from '../../client/MediaService/searchMedia.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchMediaQueryKey = (
  { companyId }: { companyId: SearchMediaPathParams['companyId'] },
  data: SearchMediaMutationRequest,
  params?: SearchMediaQueryParams,
) => [{ url: '/company/:companyId/media/search', params: { companyId: companyId } }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchMediaQueryKey = ReturnType<typeof searchMediaQueryKey>

export function searchMediaQueryOptions(
  { companyId }: { companyId: SearchMediaPathParams['companyId'] },
  data: SearchMediaMutationRequest,
  params?: SearchMediaQueryParams,
  config: Partial<RequestConfig<SearchMediaMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchMediaQueryKey({ companyId }, data, params)
  return queryOptions<SearchMediaMutationResponse, ResponseErrorConfig<Error>, SearchMediaMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchMedia({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/media/search}
 */
export function useSearchMedia<TData = SearchMediaMutationResponse, TQueryData = SearchMediaMutationResponse, TQueryKey extends QueryKey = SearchMediaQueryKey>(
  { companyId }: { companyId: SearchMediaPathParams['companyId'] },
  data: SearchMediaMutationRequest,
  params?: SearchMediaQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<SearchMediaMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchMediaMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchMediaQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchMediaQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}