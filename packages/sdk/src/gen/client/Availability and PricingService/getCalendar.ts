/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  GetCalendarMutationRequest,
  GetCalendarMutationResponse,
  GetCalendarPathParams,
} from '../../types/Availability and PricingController/GetCalendar.ts'

export function getGetCalendarUrl({ companyId }: { companyId: GetCalendarPathParams['companyId'] }) {
  return `/company/${companyId}/calendar` as const
}

/**
 * @summary Get calendar for all housing unit types in a company
 * {@link /company/:companyId/calendar}
 */
export async function getCalendar(
  { companyId }: { companyId: GetCalendarPathParams['companyId'] },
  data: GetCalendarMutationRequest,
  config: Partial<RequestConfig<GetCalendarMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCalendarMutationResponse, ResponseErrorConfig<Error>, GetCalendarMutationRequest>({
    method: 'POST',
    url: getGetCalendarUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}