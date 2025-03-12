/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetBannerByIdQueryResponse, GetBannerByIdPathParams } from '../../types/BannerController/GetBannerById.ts'

export function getGetBannerByIdUrl({ id, companyId }: { id: GetBannerByIdPathParams['id']; companyId: GetBannerByIdPathParams['companyId'] }) {
  return `/company/${companyId}/banner/${id}` as const
}

/**
 * {@link /company/:companyId/banner/:id}
 */
export async function getBannerById(
  { id, companyId }: { id: GetBannerByIdPathParams['id']; companyId: GetBannerByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetBannerByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetBannerByIdUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}