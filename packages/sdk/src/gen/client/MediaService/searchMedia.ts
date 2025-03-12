/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchMediaMutationRequest,
  SearchMediaMutationResponse,
  SearchMediaPathParams,
  SearchMediaQueryParams,
} from '../../types/MediaController/SearchMedia.ts'

export function getSearchMediaUrl({ companyId }: { companyId: SearchMediaPathParams['companyId'] }) {
  return `/company/${companyId}/media/search` as const
}

/**
 * {@link /company/:companyId/media/search}
 */
export async function searchMedia(
  { companyId }: { companyId: SearchMediaPathParams['companyId'] },
  data: SearchMediaMutationRequest,
  params?: SearchMediaQueryParams,
  config: Partial<RequestConfig<SearchMediaMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchMediaMutationResponse, ResponseErrorConfig<Error>, SearchMediaMutationRequest>({
    method: 'POST',
    url: getSearchMediaUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}