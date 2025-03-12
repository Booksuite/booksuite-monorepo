/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteBannerMutationResponse, DeleteBannerPathParams } from '../../types/BannerController/DeleteBanner.ts'

export function getDeleteBannerUrl({ id, companyId }: { id: DeleteBannerPathParams['id']; companyId: DeleteBannerPathParams['companyId'] }) {
  return `/company/${companyId}/banner/${id}` as const
}

/**
 * {@link /company/:companyId/banner/:id}
 */
export async function deleteBanner(
  { id, companyId }: { id: DeleteBannerPathParams['id']; companyId: DeleteBannerPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteBannerMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteBannerUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}