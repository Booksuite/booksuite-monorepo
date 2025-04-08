import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetUtilityLinkQueryResponse, GetUtilityLinkPathParams } from '../../types/UtilityLinksController/GetUtilityLink.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getUtilityLink } from '../../client/UtilityLinksService/getUtilityLink.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getUtilityLinkQueryKey = ({ id }: { id: GetUtilityLinkPathParams['id'] }) => ['getUtilityLink', { companyId: companyId, id: id }] as const

export type GetUtilityLinkQueryKey = ReturnType<typeof getUtilityLinkQueryKey>

export function getUtilityLinkQueryOptions({ id }: { id: GetUtilityLinkPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getUtilityLinkQueryKey({ id })
  return queryOptions<GetUtilityLinkQueryResponse, ResponseErrorConfig<Error>, GetUtilityLinkQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getUtilityLink({ id }, config)
    },
  })
}

/**
 * {@link /company/:companyId/utilityLinks/:id}
 */
export function useGetUtilityLink<
  TData = GetUtilityLinkQueryResponse,
  TQueryData = GetUtilityLinkQueryResponse,
  TQueryKey extends QueryKey = GetUtilityLinkQueryKey,
>(
  { id }: { id: GetUtilityLinkPathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<GetUtilityLinkQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUtilityLinkQueryKey({ id })

  const query = useQuery({
    ...(getUtilityLinkQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}