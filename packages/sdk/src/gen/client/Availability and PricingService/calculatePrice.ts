/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CalculatePriceMutationRequest,
  CalculatePriceMutationResponse,
  CalculatePricePathParams,
} from '../../types/Availability and PricingController/CalculatePrice.ts'

export function getCalculatePriceUrl({ companyId }: { companyId: CalculatePricePathParams['companyId'] }) {
  return `/company/${companyId}/calculatePrice` as const
}

/**
 * @summary Calculate price for all housing unit types in a company
 * {@link /company/:companyId/calculatePrice}
 */
export async function calculatePrice(
  { companyId }: { companyId: CalculatePricePathParams['companyId'] },
  data: CalculatePriceMutationRequest,
  config: Partial<RequestConfig<CalculatePriceMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CalculatePriceMutationResponse, ResponseErrorConfig<Error>, CalculatePriceMutationRequest>({
    method: 'POST',
    url: getCalculatePriceUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}