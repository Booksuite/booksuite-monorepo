import client from '@kubb/plugin-client/clients/fetch'
import type {
  SearchBannersMutationRequest,
  SearchBannersMutationResponse,
  SearchBannersPathParams,
  SearchBannersQueryParams,
} from '../../types/BannerController/SearchBanners.ts'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/fetch'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchBanners } from '../../client/BannerService/searchBanners.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchBannersQueryKey = (
  { companyId }: { companyId: SearchBannersPathParams['companyId'] },
  data: SearchBannersMutationRequest,
  params?: SearchBannersQueryParams,
) => [{ url: '/company/:companyId/banner/search', params: { companyId: companyId } }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchBannersQueryKey = ReturnType<typeof searchBannersQueryKey>

export function searchBannersQueryOptions(
  { companyId }: { companyId: SearchBannersPathParams['companyId'] },
  data: SearchBannersMutationRequest,
  params?: SearchBannersQueryParams,
  config: Partial<RequestConfig<SearchBannersMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchBannersQueryKey({ companyId }, data, params)
  return queryOptions<
    ResponseConfig<SearchBannersMutationResponse>,
    ResponseErrorConfig<Error>,
    ResponseConfig<SearchBannersMutationResponse>,
    typeof queryKey
  >({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchBanners({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/banner/search}
 */
export function useSearchBanners<
  TData = ResponseConfig<SearchBannersMutationResponse>,
  TQueryData = ResponseConfig<SearchBannersMutationResponse>,
  TQueryKey extends QueryKey = SearchBannersQueryKey,
>(
  { companyId }: { companyId: SearchBannersPathParams['companyId'] },
  data: SearchBannersMutationRequest,
  params?: SearchBannersQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<SearchBannersMutationResponse>, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchBannersMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchBannersQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchBannersQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}