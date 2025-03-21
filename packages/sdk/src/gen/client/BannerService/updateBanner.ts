/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpdateBannerMutationRequest, UpdateBannerMutationResponse, UpdateBannerPathParams } from '../../types/BannerController/UpdateBanner.ts'

export function getUpdateBannerUrl({ id, companyId }: { id: UpdateBannerPathParams['id']; companyId: UpdateBannerPathParams['companyId'] }) {
  return `/company/${companyId}/banner/${id}` as const
}

/**
 * {@link /company/:companyId/banner/:id}
 */
export async function updateBanner(
  { id, companyId }: { id: UpdateBannerPathParams['id']; companyId: UpdateBannerPathParams['companyId'] },
  data?: UpdateBannerMutationRequest,
  config: Partial<RequestConfig<UpdateBannerMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateBannerMutationResponse, ResponseErrorConfig<Error>, UpdateBannerMutationRequest>({
    method: 'PATCH',
    url: getUpdateBannerUrl({ id, companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}