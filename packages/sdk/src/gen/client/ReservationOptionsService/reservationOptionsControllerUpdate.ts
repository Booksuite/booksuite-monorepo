/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  ReservationOptionsControllerUpdateMutationRequest,
  ReservationOptionsControllerUpdateMutationResponse,
  ReservationOptionsControllerUpdatePathParams,
} from '../../types/ReservationOptionsController/ReservationOptionsControllerUpdate.ts'

export function getReservationOptionsControllerUpdateUrl({
  id,
  companyId,
}: {
  id: ReservationOptionsControllerUpdatePathParams['id']
  companyId: ReservationOptionsControllerUpdatePathParams['companyId']
}) {
  return `/company/${companyId}/reservationOptions/${id}` as const
}

/**
 * {@link /company/:companyId/reservationOptions/:id}
 */
export async function reservationOptionsControllerUpdate(
  { id, companyId }: { id: ReservationOptionsControllerUpdatePathParams['id']; companyId: ReservationOptionsControllerUpdatePathParams['companyId'] },
  data?: ReservationOptionsControllerUpdateMutationRequest,
  config: Partial<RequestConfig<ReservationOptionsControllerUpdateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ReservationOptionsControllerUpdateMutationResponse, ResponseErrorConfig<Error>, ReservationOptionsControllerUpdateMutationRequest>({
    method: 'PATCH',
    url: getReservationOptionsControllerUpdateUrl({ id, companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}