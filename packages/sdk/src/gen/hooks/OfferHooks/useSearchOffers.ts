import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchOffersMutationRequest,
  SearchOffersMutationResponse,
  SearchOffersPathParams,
  SearchOffersQueryParams,
} from '../../types/OfferController/SearchOffers.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchOffers } from '../../client/OfferService/searchOffers.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchOffersQueryKey = (
  { companyId }: { companyId: SearchOffersPathParams['companyId'] },
  data: SearchOffersMutationRequest,
  params?: SearchOffersQueryParams,
) => ['searchOffers', { companyId: companyId }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchOffersQueryKey = ReturnType<typeof searchOffersQueryKey>

export function searchOffersQueryOptions(
  { companyId }: { companyId: SearchOffersPathParams['companyId'] },
  data: SearchOffersMutationRequest,
  params?: SearchOffersQueryParams,
  config: Partial<RequestConfig<SearchOffersMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchOffersQueryKey({ companyId }, data, params)
  return queryOptions<SearchOffersMutationResponse, ResponseErrorConfig<Error>, SearchOffersMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchOffers({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/offers/search}
 */
export function useSearchOffers<
  TData = SearchOffersMutationResponse,
  TQueryData = SearchOffersMutationResponse,
  TQueryKey extends QueryKey = SearchOffersQueryKey,
>(
  { companyId }: { companyId: SearchOffersPathParams['companyId'] },
  data: SearchOffersMutationRequest,
  params?: SearchOffersQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<SearchOffersMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchOffersMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchOffersQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchOffersQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}