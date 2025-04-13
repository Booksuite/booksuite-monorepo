/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { CreateOfferMutationRequest, CreateOfferMutationResponse, CreateOfferPathParams } from '../../types/OfferController/CreateOffer.ts'

export function getCreateOfferUrl({ companyId }: { companyId: CreateOfferPathParams['companyId'] }) {
  return `/company/${companyId}/offers` as const
}

/**
 * {@link /company/:companyId/offers}
 */
export async function createOffer(
  { companyId }: { companyId: CreateOfferPathParams['companyId'] },
  data: CreateOfferMutationRequest,
  config: Partial<RequestConfig<CreateOfferMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateOfferMutationResponse, ResponseErrorConfig<Error>, CreateOfferMutationRequest>({
    method: 'POST',
    url: getCreateOfferUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}