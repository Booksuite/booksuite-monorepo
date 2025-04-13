/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  ReservationControllerUpdateMutationRequest,
  ReservationControllerUpdateMutationResponse,
  ReservationControllerUpdatePathParams,
} from '../../types/ReservationController/ReservationControllerUpdate.ts'

export function getReservationControllerUpdateUrl({
  companyId,
  id,
}: {
  companyId: ReservationControllerUpdatePathParams['companyId']
  id: ReservationControllerUpdatePathParams['id']
}) {
  return `/company/${companyId}/reservation/${id}` as const
}

/**
 * {@link /company/:companyId/reservation/:id}
 */
export async function reservationControllerUpdate(
  { companyId, id }: { companyId: ReservationControllerUpdatePathParams['companyId']; id: ReservationControllerUpdatePathParams['id'] },
  data?: ReservationControllerUpdateMutationRequest,
  config: Partial<RequestConfig<ReservationControllerUpdateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ReservationControllerUpdateMutationResponse, ResponseErrorConfig<Error>, ReservationControllerUpdateMutationRequest>({
    method: 'PATCH',
    url: getReservationControllerUpdateUrl({ companyId, id }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}