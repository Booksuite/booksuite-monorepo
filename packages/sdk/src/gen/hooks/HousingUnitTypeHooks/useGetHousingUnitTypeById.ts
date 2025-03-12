import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetHousingUnitTypeByIdQueryResponse, GetHousingUnitTypeByIdPathParams } from '../../types/HousingUnitTypeController/GetHousingUnitTypeById.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getHousingUnitTypeById } from '../../client/HousingUnitTypeService/getHousingUnitTypeById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getHousingUnitTypeByIdQueryKey = ({
  id,
  companyId,
}: {
  id: GetHousingUnitTypeByIdPathParams['id']
  companyId: GetHousingUnitTypeByIdPathParams['companyId']
}) => [{ url: '/company/:companyId/housingUnitType/:id', params: { companyId: companyId, id: id } }] as const

export type GetHousingUnitTypeByIdQueryKey = ReturnType<typeof getHousingUnitTypeByIdQueryKey>

export function getHousingUnitTypeByIdQueryOptions(
  { id, companyId }: { id: GetHousingUnitTypeByIdPathParams['id']; companyId: GetHousingUnitTypeByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getHousingUnitTypeByIdQueryKey({ id, companyId })
  return queryOptions<GetHousingUnitTypeByIdQueryResponse, ResponseErrorConfig<Error>, GetHousingUnitTypeByIdQueryResponse, typeof queryKey>({
    enabled: !!(id && companyId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getHousingUnitTypeById({ id, companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/housingUnitType/:id}
 */
export function useGetHousingUnitTypeById<
  TData = GetHousingUnitTypeByIdQueryResponse,
  TQueryData = GetHousingUnitTypeByIdQueryResponse,
  TQueryKey extends QueryKey = GetHousingUnitTypeByIdQueryKey,
>(
  { id, companyId }: { id: GetHousingUnitTypeByIdPathParams['id']; companyId: GetHousingUnitTypeByIdPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<GetHousingUnitTypeByIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getHousingUnitTypeByIdQueryKey({ id, companyId })

  const query = useQuery({
    ...(getHousingUnitTypeByIdQueryOptions({ id, companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}