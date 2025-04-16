/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpdateOfferMutationRequest, UpdateOfferMutationResponse, UpdateOfferPathParams } from '../../types/OfferController/UpdateOffer.ts'

export function getUpdateOfferUrl({ id, companyId }: { id: UpdateOfferPathParams['id']; companyId: UpdateOfferPathParams['companyId'] }) {
  return `/company/${companyId}/offers/${id}` as const
}

/**
 * {@link /company/:companyId/offers/:id}
 */
export async function updateOffer(
  { id, companyId }: { id: UpdateOfferPathParams['id']; companyId: UpdateOfferPathParams['companyId'] },
  data?: UpdateOfferMutationRequest,
  config: Partial<RequestConfig<UpdateOfferMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateOfferMutationResponse, ResponseErrorConfig<Error>, UpdateOfferMutationRequest>({
    method: 'PATCH',
    url: getUpdateOfferUrl({ id, companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}