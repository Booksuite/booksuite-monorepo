import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CalculatePriceFromHousingUnitTypeIdMutationRequest,
  CalculatePriceFromHousingUnitTypeIdMutationResponse,
  CalculatePriceFromHousingUnitTypeIdPathParams,
} from '../../types/Availability and PricingController/CalculatePriceFromHousingUnitTypeId.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { calculatePriceFromHousingUnitTypeId } from '../../client/Availability and PricingService/calculatePriceFromHousingUnitTypeId.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const calculatePriceFromHousingUnitTypeIdQueryKey = (
  {
    housingUnitTypeId,
    companyId,
  }: {
    housingUnitTypeId: CalculatePriceFromHousingUnitTypeIdPathParams['housingUnitTypeId']
    companyId: CalculatePriceFromHousingUnitTypeIdPathParams['companyId']
  },
  data: CalculatePriceFromHousingUnitTypeIdMutationRequest,
) => ['calculatePriceFromHousingUnitTypeId', { companyId: companyId, housingUnitTypeId: housingUnitTypeId }, ...(data ? [data] : [])] as const

export type CalculatePriceFromHousingUnitTypeIdQueryKey = ReturnType<typeof calculatePriceFromHousingUnitTypeIdQueryKey>

export function calculatePriceFromHousingUnitTypeIdQueryOptions(
  {
    housingUnitTypeId,
    companyId,
  }: {
    housingUnitTypeId: CalculatePriceFromHousingUnitTypeIdPathParams['housingUnitTypeId']
    companyId: CalculatePriceFromHousingUnitTypeIdPathParams['companyId']
  },
  data: CalculatePriceFromHousingUnitTypeIdMutationRequest,
  config: Partial<RequestConfig<CalculatePriceFromHousingUnitTypeIdMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = calculatePriceFromHousingUnitTypeIdQueryKey({ housingUnitTypeId, companyId }, data)
  return queryOptions<
    CalculatePriceFromHousingUnitTypeIdMutationResponse,
    ResponseErrorConfig<Error>,
    CalculatePriceFromHousingUnitTypeIdMutationResponse,
    typeof queryKey
  >({
    enabled: !!(housingUnitTypeId && companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return calculatePriceFromHousingUnitTypeId({ housingUnitTypeId, companyId }, data, config)
    },
  })
}

/**
 * @summary Calculate price for a housing unit type
 * {@link /company/:companyId/calculatePrice/:housingUnitTypeId}
 */
export function useCalculatePriceFromHousingUnitTypeId<
  TData = CalculatePriceFromHousingUnitTypeIdMutationResponse,
  TQueryData = CalculatePriceFromHousingUnitTypeIdMutationResponse,
  TQueryKey extends QueryKey = CalculatePriceFromHousingUnitTypeIdQueryKey,
>(
  {
    housingUnitTypeId,
    companyId,
  }: {
    housingUnitTypeId: CalculatePriceFromHousingUnitTypeIdPathParams['housingUnitTypeId']
    companyId: CalculatePriceFromHousingUnitTypeIdPathParams['companyId']
  },
  data: CalculatePriceFromHousingUnitTypeIdMutationRequest,
  options: {
    query?: Partial<QueryObserverOptions<CalculatePriceFromHousingUnitTypeIdMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<CalculatePriceFromHousingUnitTypeIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? calculatePriceFromHousingUnitTypeIdQueryKey({ housingUnitTypeId, companyId }, data)

  const query = useQuery({
    ...(calculatePriceFromHousingUnitTypeIdQueryOptions({ housingUnitTypeId, companyId }, data, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}