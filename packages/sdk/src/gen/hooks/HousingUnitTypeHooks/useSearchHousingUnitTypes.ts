import client from '@kubb/plugin-client/clients/fetch'
import type {
  SearchHousingUnitTypesMutationRequest,
  SearchHousingUnitTypesMutationResponse,
  SearchHousingUnitTypesPathParams,
  SearchHousingUnitTypesQueryParams,
} from '../../types/HousingUnitTypeController/SearchHousingUnitTypes.ts'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/fetch'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { searchHousingUnitTypes } from '../../client/HousingUnitTypeService/searchHousingUnitTypes.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchHousingUnitTypesQueryKey = (
  { companyId }: { companyId: SearchHousingUnitTypesPathParams['companyId'] },
  data: SearchHousingUnitTypesMutationRequest,
  params?: SearchHousingUnitTypesQueryParams,
) => [{ url: '/company/:companyId/housingUnitType/search', params: { companyId: companyId } }, ...(params ? [params] : []), ...(data ? [data] : [])] as const

export type SearchHousingUnitTypesQueryKey = ReturnType<typeof searchHousingUnitTypesQueryKey>

export function searchHousingUnitTypesQueryOptions(
  { companyId }: { companyId: SearchHousingUnitTypesPathParams['companyId'] },
  data: SearchHousingUnitTypesMutationRequest,
  params?: SearchHousingUnitTypesQueryParams,
  config: Partial<RequestConfig<SearchHousingUnitTypesMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = searchHousingUnitTypesQueryKey({ companyId }, data, params)
  return queryOptions<
    ResponseConfig<SearchHousingUnitTypesMutationResponse>,
    ResponseErrorConfig<Error>,
    ResponseConfig<SearchHousingUnitTypesMutationResponse>,
    typeof queryKey
  >({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return searchHousingUnitTypes({ companyId }, data, params, config)
    },
  })
}

/**
 * {@link /company/:companyId/housingUnitType/search}
 */
export function useSearchHousingUnitTypes<
  TData = ResponseConfig<SearchHousingUnitTypesMutationResponse>,
  TQueryData = ResponseConfig<SearchHousingUnitTypesMutationResponse>,
  TQueryKey extends QueryKey = SearchHousingUnitTypesQueryKey,
>(
  { companyId }: { companyId: SearchHousingUnitTypesPathParams['companyId'] },
  data: SearchHousingUnitTypesMutationRequest,
  params?: SearchHousingUnitTypesQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<SearchHousingUnitTypesMutationResponse>, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<SearchHousingUnitTypesMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchHousingUnitTypesQueryKey({ companyId }, data, params)

  const query = useQuery({
    ...(searchHousingUnitTypesQueryOptions({ companyId }, data, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}