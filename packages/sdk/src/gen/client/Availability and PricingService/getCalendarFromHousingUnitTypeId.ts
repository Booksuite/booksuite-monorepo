/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  GetCalendarFromHousingUnitTypeIdMutationRequest,
  GetCalendarFromHousingUnitTypeIdMutationResponse,
  GetCalendarFromHousingUnitTypeIdPathParams,
} from '../../types/Availability and PricingController/GetCalendarFromHousingUnitTypeId.ts'

export function getGetCalendarFromHousingUnitTypeIdUrl({
  housingUnitTypeId,
  companyId,
}: {
  housingUnitTypeId: GetCalendarFromHousingUnitTypeIdPathParams['housingUnitTypeId']
  companyId: GetCalendarFromHousingUnitTypeIdPathParams['companyId']
}) {
  return `/company/${companyId}/calendar/${housingUnitTypeId}` as const
}

/**
 * @summary Get calendar for a specific housing unit type
 * {@link /company/:companyId/calendar/:housingUnitTypeId}
 */
export async function getCalendarFromHousingUnitTypeId(
  {
    housingUnitTypeId,
    companyId,
  }: { housingUnitTypeId: GetCalendarFromHousingUnitTypeIdPathParams['housingUnitTypeId']; companyId: GetCalendarFromHousingUnitTypeIdPathParams['companyId'] },
  data: GetCalendarFromHousingUnitTypeIdMutationRequest,
  config: Partial<RequestConfig<GetCalendarFromHousingUnitTypeIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCalendarFromHousingUnitTypeIdMutationResponse, ResponseErrorConfig<Error>, GetCalendarFromHousingUnitTypeIdMutationRequest>({
    method: 'POST',
    url: getGetCalendarFromHousingUnitTypeIdUrl({ housingUnitTypeId, companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}