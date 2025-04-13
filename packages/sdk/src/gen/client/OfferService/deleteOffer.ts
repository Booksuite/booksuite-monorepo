/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteOfferMutationResponse, DeleteOfferPathParams } from '../../types/OfferController/DeleteOffer.ts'

export function getDeleteOfferUrl({ id }: { id: DeleteOfferPathParams['id'] }) {
  return `/company/${companyId}/offers/${id}` as const
}

/**
 * {@link /company/:companyId/offers/:id}
 */
export async function deleteOffer({ id }: { id: DeleteOfferPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteOfferMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteOfferUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}