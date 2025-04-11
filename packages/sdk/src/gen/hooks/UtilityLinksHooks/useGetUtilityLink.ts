import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetUtilityLinkQueryResponse, GetUtilityLinkPathParams } from '../../types/UtilityLinksController/GetUtilityLink.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getUtilityLink } from '../../client/UtilityLinksService/getUtilityLink.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getUtilityLinkQueryKey = ({ id, companyId }: { id: GetUtilityLinkPathParams['id']; companyId: GetUtilityLinkPathParams['companyId'] }) =>
  ['getUtilityLink', { companyId: companyId, id: id }] as const

export type GetUtilityLinkQueryKey = ReturnType<typeof getUtilityLinkQueryKey>

export function getUtilityLinkQueryOptions(
  { id, companyId }: { id: GetUtilityLinkPathParams['id']; companyId: GetUtilityLinkPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getUtilityLinkQueryKey({ id, companyId })
  return queryOptions<GetUtilityLinkQueryResponse, ResponseErrorConfig<Error>, GetUtilityLinkQueryResponse, typeof queryKey>({
    enabled: !!(id && companyId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getUtilityLink({ id, companyId }, config)
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
  { id, companyId }: { id: GetUtilityLinkPathParams['id']; companyId: GetUtilityLinkPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<GetUtilityLinkQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUtilityLinkQueryKey({ id, companyId })

  const query = useQuery({
    ...(getUtilityLinkQueryOptions({ id, companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}