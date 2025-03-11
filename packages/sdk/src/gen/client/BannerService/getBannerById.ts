/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { GetBannerByIdQueryResponse, GetBannerByIdPathParams } from '../../types/BannerController/GetBannerById.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

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
  return res
}