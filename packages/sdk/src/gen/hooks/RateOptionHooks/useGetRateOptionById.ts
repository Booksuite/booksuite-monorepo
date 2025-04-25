import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetRateOptionByIdQueryResponse, GetRateOptionByIdPathParams } from '../../types/RateOptionController/GetRateOptionById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getRateOptionById } from '../../client/RateOptionService/getRateOptionById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getRateOptionByIdQueryKey = ({ id, companyId }: { id: GetRateOptionByIdPathParams['id']; companyId: GetRateOptionByIdPathParams['companyId'] }) =>
  ['getRateOptionById', { companyId: companyId, id: id }] as const

export type GetRateOptionByIdQueryKey = ReturnType<typeof getRateOptionByIdQueryKey>

export function getRateOptionByIdQueryOptions(
  { id, companyId }: { id: GetRateOptionByIdPathParams['id']; companyId: GetRateOptionByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getRateOptionByIdQueryKey({ id, companyId })
  return queryOptions<GetRateOptionByIdQueryResponse, ResponseErrorConfig<Error>, GetRateOptionByIdQueryResponse, typeof queryKey>({
    enabled: !!(id && companyId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getRateOptionById({ id, companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/rateOption/:id}
 */
export function useGetRateOptionById<
  TData = GetRateOptionByIdQueryResponse,
  TQueryData = GetRateOptionByIdQueryResponse,
  TQueryKey extends QueryKey = GetRateOptionByIdQueryKey,
>(
  { id, companyId }: { id: GetRateOptionByIdPathParams['id']; companyId: GetRateOptionByIdPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<GetRateOptionByIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getRateOptionByIdQueryKey({ id, companyId })

  const query = useQuery({
    ...(getRateOptionByIdQueryOptions({ id, companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}