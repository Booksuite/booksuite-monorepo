/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CalculatePriceFromHousingUnitTypeIdMutationRequest,
  CalculatePriceFromHousingUnitTypeIdMutationResponse,
  CalculatePriceFromHousingUnitTypeIdPathParams,
} from '../../types/Availability and PricingController/CalculatePriceFromHousingUnitTypeId.ts'

export function getCalculatePriceFromHousingUnitTypeIdUrl({
  housingUnitTypeId,
  companyId,
}: {
  housingUnitTypeId: CalculatePriceFromHousingUnitTypeIdPathParams['housingUnitTypeId']
  companyId: CalculatePriceFromHousingUnitTypeIdPathParams['companyId']
}) {
  return `/company/${companyId}/calculatePrice/${housingUnitTypeId}` as const
}

/**
 * @summary Calculate price for a housing unit type
 * {@link /company/:companyId/calculatePrice/:housingUnitTypeId}
 */
export async function calculatePriceFromHousingUnitTypeId(
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
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    CalculatePriceFromHousingUnitTypeIdMutationResponse,
    ResponseErrorConfig<Error>,
    CalculatePriceFromHousingUnitTypeIdMutationRequest
  >({ method: 'POST', url: getCalculatePriceFromHousingUnitTypeIdUrl({ housingUnitTypeId, companyId }).toString(), data, ...requestConfig })
  return res.data
}