/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpdateReservationMutationRequest,
  UpdateReservationMutationResponse,
  UpdateReservationPathParams,
} from '../../types/ReservationController/UpdateReservation.ts'

export function getUpdateReservationUrl({ id, companyId }: { id: UpdateReservationPathParams['id']; companyId: UpdateReservationPathParams['companyId'] }) {
  return `/company/${companyId}/reservation/${id}` as const
}

/**
 * {@link /company/:companyId/reservation/:id}
 */
export async function updateReservation(
  { id, companyId }: { id: UpdateReservationPathParams['id']; companyId: UpdateReservationPathParams['companyId'] },
  data: UpdateReservationMutationRequest,
  config: Partial<RequestConfig<UpdateReservationMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateReservationMutationResponse, ResponseErrorConfig<Error>, UpdateReservationMutationRequest>({
    method: 'PATCH',
    url: getUpdateReservationUrl({ id, companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}