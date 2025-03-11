/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  SearchBannersMutationRequest,
  SearchBannersMutationResponse,
  SearchBannersPathParams,
  SearchBannersQueryParams,
} from '../../types/BannerController/SearchBanners.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

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
  return res
}