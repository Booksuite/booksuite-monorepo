/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  ReservationOptionsControllerCreateMutationRequest,
  ReservationOptionsControllerCreateMutationResponse,
  ReservationOptionsControllerCreatePathParams,
} from '../../types/ReservationOptionsController/ReservationOptionsControllerCreate.ts'

export function getReservationOptionsControllerCreateUrl({ companyId }: { companyId: ReservationOptionsControllerCreatePathParams['companyId'] }) {
  return `/company/${companyId}/reservationOptions` as const
}

/**
 * {@link /company/:companyId/reservationOptions}
 */
export async function reservationOptionsControllerCreate(
  { companyId }: { companyId: ReservationOptionsControllerCreatePathParams['companyId'] },
  data: ReservationOptionsControllerCreateMutationRequest,
  config: Partial<RequestConfig<ReservationOptionsControllerCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ReservationOptionsControllerCreateMutationResponse, ResponseErrorConfig<Error>, ReservationOptionsControllerCreateMutationRequest>({
    method: 'POST',
    url: getReservationOptionsControllerCreateUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}