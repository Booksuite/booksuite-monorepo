/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { GetMediaByIdQueryResponse, GetMediaByIdPathParams } from '../../types/MediaController/GetMediaById.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetMediaByIdUrl({ id, companyId }: { id: GetMediaByIdPathParams['id']; companyId: GetMediaByIdPathParams['companyId'] }) {
  return `/company/${companyId}/media/${id}` as const
}

/**
 * {@link /company/:companyId/media/:id}
 */
export async function getMediaById(
  { id, companyId }: { id: GetMediaByIdPathParams['id']; companyId: GetMediaByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetMediaByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetMediaByIdUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res
}