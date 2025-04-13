/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchOffersMutationRequest,
  SearchOffersMutationResponse,
  SearchOffersPathParams,
  SearchOffersQueryParams,
} from '../../types/OfferController/SearchOffers.ts'

export function getSearchOffersUrl({ companyId }: { companyId: SearchOffersPathParams['companyId'] }) {
  return `/company/${companyId}/offers/search` as const
}

/**
 * {@link /company/:companyId/offers/search}
 */
export async function searchOffers(
  { companyId }: { companyId: SearchOffersPathParams['companyId'] },
  data: SearchOffersMutationRequest,
  params?: SearchOffersQueryParams,
  config: Partial<RequestConfig<SearchOffersMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchOffersMutationResponse, ResponseErrorConfig<Error>, SearchOffersMutationRequest>({
    method: 'POST',
    url: getSearchOffersUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}