/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  GetCompanyReservationConfigQueryResponse,
  GetCompanyReservationConfigPathParams,
} from '../../types/ReservationConfigController/GetCompanyReservationConfig.ts'

export function getGetCompanyReservationConfigUrl({ companyId }: { companyId: GetCompanyReservationConfigPathParams['companyId'] }) {
  return `/company/${companyId}/reservationConfig` as const
}

/**
 * {@link /company/:companyId/reservationConfig}
 */
export async function getCompanyReservationConfig(
  { companyId }: { companyId: GetCompanyReservationConfigPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCompanyReservationConfigQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetCompanyReservationConfigUrl({ companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}