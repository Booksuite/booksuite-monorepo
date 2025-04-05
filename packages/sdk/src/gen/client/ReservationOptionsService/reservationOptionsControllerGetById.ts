/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  ReservationOptionsControllerGetByIdQueryResponse,
  ReservationOptionsControllerGetByIdPathParams,
} from '../../types/ReservationOptionsController/ReservationOptionsControllerGetById.ts'

export function getReservationOptionsControllerGetByIdUrl({
  id,
  companyId,
}: {
  id: ReservationOptionsControllerGetByIdPathParams['id']
  companyId: ReservationOptionsControllerGetByIdPathParams['companyId']
}) {
  return `/company/${companyId}/reservationOptions/${id}` as const
}

/**
 * {@link /company/:companyId/reservationOptions/:id}
 */
export async function reservationOptionsControllerGetById(
  { id, companyId }: { id: ReservationOptionsControllerGetByIdPathParams['id']; companyId: ReservationOptionsControllerGetByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ReservationOptionsControllerGetByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getReservationOptionsControllerGetByIdUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}