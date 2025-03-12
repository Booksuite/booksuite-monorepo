/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteReservationMutationResponse, DeleteReservationPathParams } from '../../types/ReservationController/DeleteReservation.ts'

export function getDeleteReservationUrl({ id, companyId }: { id: DeleteReservationPathParams['id']; companyId: DeleteReservationPathParams['companyId'] }) {
  return `/company/${companyId}/reservation/${id}` as const
}

/**
 * {@link /company/:companyId/reservation/:id}
 */
export async function deleteReservation(
  { id, companyId }: { id: DeleteReservationPathParams['id']; companyId: DeleteReservationPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteReservationMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteReservationUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}