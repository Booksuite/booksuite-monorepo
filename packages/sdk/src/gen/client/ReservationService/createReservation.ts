/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CreateReservationMutationRequest,
  CreateReservationMutationResponse,
  CreateReservationPathParams,
} from '../../types/ReservationController/CreateReservation.ts'

export function getCreateReservationUrl({ companyId }: { companyId: CreateReservationPathParams['companyId'] }) {
  return `/company/${companyId}/reservation/create` as const
}

/**
 * {@link /company/:companyId/reservation/create}
 */
export async function createReservation(
  { companyId }: { companyId: CreateReservationPathParams['companyId'] },
  data: CreateReservationMutationRequest,
  config: Partial<RequestConfig<CreateReservationMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateReservationMutationResponse, ResponseErrorConfig<Error>, CreateReservationMutationRequest>({
    method: 'POST',
    url: getCreateReservationUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}