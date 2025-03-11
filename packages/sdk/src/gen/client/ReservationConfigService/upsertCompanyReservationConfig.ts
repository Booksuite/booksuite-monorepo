/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  UpsertCompanyReservationConfigMutationRequest,
  UpsertCompanyReservationConfigMutationResponse,
  UpsertCompanyReservationConfigPathParams,
} from '../../types/ReservationConfigController/UpsertCompanyReservationConfig.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getUpsertCompanyReservationConfigUrl({ companyId }: { companyId: UpsertCompanyReservationConfigPathParams['companyId'] }) {
  return `/company/${companyId}/reservationConfig` as const
}

/**
 * {@link /company/:companyId/reservationConfig}
 */
export async function upsertCompanyReservationConfig(
  { companyId }: { companyId: UpsertCompanyReservationConfigPathParams['companyId'] },
  data: UpsertCompanyReservationConfigMutationRequest,
  config: Partial<RequestConfig<UpsertCompanyReservationConfigMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpsertCompanyReservationConfigMutationResponse, ResponseErrorConfig<Error>, UpsertCompanyReservationConfigMutationRequest>({
    method: 'PATCH',
    url: getUpsertCompanyReservationConfigUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res
}