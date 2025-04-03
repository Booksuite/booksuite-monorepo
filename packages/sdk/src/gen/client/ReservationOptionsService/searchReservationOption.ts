/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchReservationOptionMutationRequest,
  SearchReservationOptionMutationResponse,
  SearchReservationOptionPathParams,
  SearchReservationOptionQueryParams,
} from '../../types/ReservationOptionsController/SearchReservationOption.ts'

export function getSearchReservationOptionUrl({ companyId }: { companyId: SearchReservationOptionPathParams['companyId'] }) {
  return `/company/${companyId}/reservationOptions/search` as const
}

/**
 * {@link /company/:companyId/reservationOptions/search}
 */
export async function searchReservationOption(
  { companyId }: { companyId: SearchReservationOptionPathParams['companyId'] },
  data: SearchReservationOptionMutationRequest,
  params?: SearchReservationOptionQueryParams,
  config: Partial<RequestConfig<SearchReservationOptionMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchReservationOptionMutationResponse, ResponseErrorConfig<Error>, SearchReservationOptionMutationRequest>({
    method: 'POST',
    url: getSearchReservationOptionUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}