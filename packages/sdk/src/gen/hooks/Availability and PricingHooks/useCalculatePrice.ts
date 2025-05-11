import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CalculatePriceMutationRequest,
  CalculatePriceMutationResponse,
  CalculatePricePathParams,
} from '../../types/Availability and PricingController/CalculatePrice.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { calculatePrice } from '../../client/Availability and PricingService/calculatePrice.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const calculatePriceQueryKey = ({ companyId }: { companyId: CalculatePricePathParams['companyId'] }, data: CalculatePriceMutationRequest) =>
  ['calculatePrice', { companyId: companyId }, ...(data ? [data] : [])] as const

export type CalculatePriceQueryKey = ReturnType<typeof calculatePriceQueryKey>

export function calculatePriceQueryOptions(
  { companyId }: { companyId: CalculatePricePathParams['companyId'] },
  data: CalculatePriceMutationRequest,
  config: Partial<RequestConfig<CalculatePriceMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = calculatePriceQueryKey({ companyId }, data)
  return queryOptions<CalculatePriceMutationResponse, ResponseErrorConfig<Error>, CalculatePriceMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return calculatePrice({ companyId }, data, config)
    },
  })
}

/**
 * @summary Calculate price for all housing unit types in a company
 * {@link /company/:companyId/calculatePrice}
 */
export function useCalculatePrice<
  TData = CalculatePriceMutationResponse,
  TQueryData = CalculatePriceMutationResponse,
  TQueryKey extends QueryKey = CalculatePriceQueryKey,
>(
  { companyId }: { companyId: CalculatePricePathParams['companyId'] },
  data: CalculatePriceMutationRequest,
  options: {
    query?: Partial<QueryObserverOptions<CalculatePriceMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<CalculatePriceMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? calculatePriceQueryKey({ companyId }, data)

  const query = useQuery({
    ...(calculatePriceQueryOptions({ companyId }, data, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}