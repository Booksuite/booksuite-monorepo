/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetOfferByIdQueryResponse, GetOfferByIdPathParams } from '../../types/OfferController/GetOfferById.ts'

export function getGetOfferByIdUrl({ id, companyId }: { id: GetOfferByIdPathParams['id']; companyId: GetOfferByIdPathParams['companyId'] }) {
  return `/company/${companyId}/offers/${id}` as const
}

/**
 * {@link /company/:companyId/offers/:id}
 */
export async function getOfferById(
  { id, companyId }: { id: GetOfferByIdPathParams['id']; companyId: GetOfferByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetOfferByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetOfferByIdUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}