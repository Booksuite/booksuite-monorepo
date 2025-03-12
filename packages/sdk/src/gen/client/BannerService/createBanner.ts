/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { CreateBannerMutationRequest, CreateBannerMutationResponse, CreateBannerPathParams } from '../../types/BannerController/CreateBanner.ts'

export function getCreateBannerUrl({ companyId }: { companyId: CreateBannerPathParams['companyId'] }) {
  return `/company/${companyId}/banner/create` as const
}

/**
 * {@link /company/:companyId/banner/create}
 */
export async function createBanner(
  { companyId }: { companyId: CreateBannerPathParams['companyId'] },
  data: CreateBannerMutationRequest,
  config: Partial<RequestConfig<CreateBannerMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateBannerMutationResponse, ResponseErrorConfig<Error>, CreateBannerMutationRequest>({
    method: 'POST',
    url: getCreateBannerUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}