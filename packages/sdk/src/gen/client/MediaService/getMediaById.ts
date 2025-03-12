/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetMediaByIdQueryResponse, GetMediaByIdPathParams } from '../../types/MediaController/GetMediaById.ts'

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
  return res.data
}