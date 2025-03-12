/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchBannersMutationRequest,
  SearchBannersMutationResponse,
  SearchBannersPathParams,
  SearchBannersQueryParams,
} from '../../types/BannerController/SearchBanners.ts'

export function getSearchBannersUrl({ companyId }: { companyId: SearchBannersPathParams['companyId'] }) {
  return `/company/${companyId}/banner/search` as const
}

/**
 * {@link /company/:companyId/banner/search}
 */
export async function searchBanners(
  { companyId }: { companyId: SearchBannersPathParams['companyId'] },
  data: SearchBannersMutationRequest,
  params?: SearchBannersQueryParams,
  config: Partial<RequestConfig<SearchBannersMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchBannersMutationResponse, ResponseErrorConfig<Error>, SearchBannersMutationRequest>({
    method: 'POST',
    url: getSearchBannersUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}