import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SeasonRulesControllerGetByIdQueryResponse,
  SeasonRulesControllerGetByIdPathParams,
} from '../../types/SeasonRulesController/SeasonRulesControllerGetById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { seasonRulesControllerGetById } from '../../client/SeasonRulesService/seasonRulesControllerGetById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const seasonRulesControllerGetByIdQueryKey = ({
  id,
  companyId,
}: {
  id: SeasonRulesControllerGetByIdPathParams['id']
  companyId: SeasonRulesControllerGetByIdPathParams['companyId']
}) => ['SeasonRulesController_getById', { companyId: companyId, id: id }] as const

export type SeasonRulesControllerGetByIdQueryKey = ReturnType<typeof seasonRulesControllerGetByIdQueryKey>

export function seasonRulesControllerGetByIdQueryOptions(
  { id, companyId }: { id: SeasonRulesControllerGetByIdPathParams['id']; companyId: SeasonRulesControllerGetByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = seasonRulesControllerGetByIdQueryKey({ id, companyId })
  return queryOptions<SeasonRulesControllerGetByIdQueryResponse, ResponseErrorConfig<Error>, SeasonRulesControllerGetByIdQueryResponse, typeof queryKey>({
    enabled: !!(id && companyId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return seasonRulesControllerGetById({ id, companyId }, config)
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
  { id, companyId }: { id: SeasonRulesControllerGetByIdPathParams['id']; companyId: SeasonRulesControllerGetByIdPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<SeasonRulesControllerGetByIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? seasonRulesControllerGetByIdQueryKey({ id, companyId })

  const query = useQuery({
    ...(seasonRulesControllerGetByIdQueryOptions({ id, companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}