/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchUtilityLinksMutationRequest,
  SearchUtilityLinksMutationResponse,
  SearchUtilityLinksPathParams,
  SearchUtilityLinksQueryParams,
} from '../../types/UtilityLinksController/SearchUtilityLinks.ts'

export function getSearchUtilityLinksUrl({ companyId }: { companyId: SearchUtilityLinksPathParams['companyId'] }) {
  return `/company/${companyId}/utilityLinks/search` as const
}

/**
 * {@link /company/:companyId/utilityLinks/search}
 */
export async function searchUtilityLinks(
  { companyId }: { companyId: SearchUtilityLinksPathParams['companyId'] },
  data: SearchUtilityLinksMutationRequest,
  params?: SearchUtilityLinksQueryParams,
  config: Partial<RequestConfig<SearchUtilityLinksMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchUtilityLinksMutationResponse, ResponseErrorConfig<Error>, SearchUtilityLinksMutationRequest>({
    method: 'POST',
    url: getSearchUtilityLinksUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}