import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  GetCalendarFromHousingUnitTypeIdMutationRequest,
  GetCalendarFromHousingUnitTypeIdMutationResponse,
  GetCalendarFromHousingUnitTypeIdPathParams,
} from '../../types/Availability and PricingController/GetCalendarFromHousingUnitTypeId.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCalendarFromHousingUnitTypeId } from '../../client/Availability and PricingService/getCalendarFromHousingUnitTypeId.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCalendarFromHousingUnitTypeIdQueryKey = (
  {
    housingUnitTypeId,
    companyId,
  }: { housingUnitTypeId: GetCalendarFromHousingUnitTypeIdPathParams['housingUnitTypeId']; companyId: GetCalendarFromHousingUnitTypeIdPathParams['companyId'] },
  data: GetCalendarFromHousingUnitTypeIdMutationRequest,
) => ['getCalendarFromHousingUnitTypeId', { companyId: companyId, housingUnitTypeId: housingUnitTypeId }, ...(data ? [data] : [])] as const

export type GetCalendarFromHousingUnitTypeIdQueryKey = ReturnType<typeof getCalendarFromHousingUnitTypeIdQueryKey>

export function getCalendarFromHousingUnitTypeIdQueryOptions(
  {
    housingUnitTypeId,
    companyId,
  }: { housingUnitTypeId: GetCalendarFromHousingUnitTypeIdPathParams['housingUnitTypeId']; companyId: GetCalendarFromHousingUnitTypeIdPathParams['companyId'] },
  data: GetCalendarFromHousingUnitTypeIdMutationRequest,
  config: Partial<RequestConfig<GetCalendarFromHousingUnitTypeIdMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = getCalendarFromHousingUnitTypeIdQueryKey({ housingUnitTypeId, companyId }, data)
  return queryOptions<
    GetCalendarFromHousingUnitTypeIdMutationResponse,
    ResponseErrorConfig<Error>,
    GetCalendarFromHousingUnitTypeIdMutationResponse,
    typeof queryKey
  >({
    enabled: !!(housingUnitTypeId && companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCalendarFromHousingUnitTypeId({ housingUnitTypeId, companyId }, data, config)
    },
  })
}

/**
 * @summary Get calendar for a specific housing unit type
 * {@link /company/:companyId/calendar/:housingUnitTypeId}
 */
export function useGetCalendarFromHousingUnitTypeId<
  TData = GetCalendarFromHousingUnitTypeIdMutationResponse,
  TQueryData = GetCalendarFromHousingUnitTypeIdMutationResponse,
  TQueryKey extends QueryKey = GetCalendarFromHousingUnitTypeIdQueryKey,
>(
  {
    housingUnitTypeId,
    companyId,
  }: { housingUnitTypeId: GetCalendarFromHousingUnitTypeIdPathParams['housingUnitTypeId']; companyId: GetCalendarFromHousingUnitTypeIdPathParams['companyId'] },
  data: GetCalendarFromHousingUnitTypeIdMutationRequest,
  options: {
    query?: Partial<QueryObserverOptions<GetCalendarFromHousingUnitTypeIdMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<GetCalendarFromHousingUnitTypeIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCalendarFromHousingUnitTypeIdQueryKey({ housingUnitTypeId, companyId }, data)

  const query = useQuery({
    ...(getCalendarFromHousingUnitTypeIdQueryOptions({ housingUnitTypeId, companyId }, data, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}