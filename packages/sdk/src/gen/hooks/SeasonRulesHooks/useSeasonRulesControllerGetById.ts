import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SeasonRulesControllerGetByIdQueryResponse,
  SeasonRulesControllerGetByIdPathParams,
} from '../../types/SeasonRulesController/SeasonRulesControllerGetById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { seasonRulesControllerGetById } from '../../client/SeasonRulesService/seasonRulesControllerGetById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const seasonRulesControllerGetByIdQueryKey = ({ id }: { id: SeasonRulesControllerGetByIdPathParams['id'] }) =>
  ['SeasonRulesController_getById', { companyId: companyId, id: id }] as const

export type SeasonRulesControllerGetByIdQueryKey = ReturnType<typeof seasonRulesControllerGetByIdQueryKey>

export function seasonRulesControllerGetByIdQueryOptions(
  { id }: { id: SeasonRulesControllerGetByIdPathParams['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = seasonRulesControllerGetByIdQueryKey({ id })
  return queryOptions<SeasonRulesControllerGetByIdQueryResponse, ResponseErrorConfig<Error>, SeasonRulesControllerGetByIdQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return seasonRulesControllerGetById({ id }, config)
    },
  })
}

/**
 * {@link /company/:companyId/seasonRules/:id}
 */
export function useSeasonRulesControllerGetById<
  TData = SeasonRulesControllerGetByIdQueryResponse,
  TQueryData = SeasonRulesControllerGetByIdQueryResponse,
  TQueryKey extends QueryKey = SeasonRulesControllerGetByIdQueryKey,
>(
  { id }: { id: SeasonRulesControllerGetByIdPathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<SeasonRulesControllerGetByIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? seasonRulesControllerGetByIdQueryKey({ id })

  const query = useQuery({
    ...(seasonRulesControllerGetByIdQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}