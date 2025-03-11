/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  SearchReservationsMutationRequest,
  SearchReservationsMutationResponse,
  SearchReservationsPathParams,
  SearchReservationsQueryParams,
} from '../../types/ReservationController/SearchReservations.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getSearchReservationsUrl({ companyId }: { companyId: SearchReservationsPathParams['companyId'] }) {
  return `/company/${companyId}/reservation/search` as const
}

/**
 * {@link /company/:companyId/reservation/search}
 */
export async function searchReservations(
  { companyId }: { companyId: SearchReservationsPathParams['companyId'] },
  data: SearchReservationsMutationRequest,
  params?: SearchReservationsQueryParams,
  config: Partial<RequestConfig<SearchReservationsMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchReservationsMutationResponse, ResponseErrorConfig<Error>, SearchReservationsMutationRequest>({
    method: 'POST',
    url: getSearchReservationsUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res
}