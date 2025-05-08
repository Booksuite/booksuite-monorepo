import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CalculatePriceMutationRequest,
  CalculatePriceMutationResponse,
  CalculatePricePathParams,
} from '../../types/Availability and PricingController/CalculatePrice.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { calculatePrice } from '../../client/Availability and PricingService/calculatePrice.ts'
import { useMutation } from '@tanstack/react-query'

export const calculatePriceMutationKey = () => [{ url: '/company/{companyId}/calculatePrice' }] as const

export type CalculatePriceMutationKey = ReturnType<typeof calculatePriceMutationKey>

/**
 * @summary Calculate price for all housing unit types in a company
 * {@link /company/:companyId/calculatePrice}
 */
export function useCalculatePrice<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CalculatePriceMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: CalculatePricePathParams['companyId']; data: CalculatePriceMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CalculatePriceMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? calculatePriceMutationKey()

  return useMutation<
    CalculatePriceMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: CalculatePricePathParams['companyId']; data: CalculatePriceMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return calculatePrice({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}