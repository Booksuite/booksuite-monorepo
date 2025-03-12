/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetReservationByIdQueryResponse, GetReservationByIdPathParams } from '../../types/ReservationController/GetReservationById.ts'

export function getGetReservationByIdUrl({ id, companyId }: { id: GetReservationByIdPathParams['id']; companyId: GetReservationByIdPathParams['companyId'] }) {
  return `/company/${companyId}/reservation/${id}` as const
}

/**
 * {@link /company/:companyId/reservation/:id}
 */
export async function getReservationById(
  { id, companyId }: { id: GetReservationByIdPathParams['id']; companyId: GetReservationByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetReservationByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetReservationByIdUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}