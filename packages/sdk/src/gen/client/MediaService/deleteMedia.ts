/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteMediaMutationResponse, DeleteMediaPathParams } from '../../types/MediaController/DeleteMedia.ts'

export function getDeleteMediaUrl({ id, companyId }: { id: DeleteMediaPathParams['id']; companyId: DeleteMediaPathParams['companyId'] }) {
  return `/company/${companyId}/media/${id}` as const
}

/**
 * {@link /company/:companyId/media/:id}
 */
export async function deleteMedia(
  { id, companyId }: { id: DeleteMediaPathParams['id']; companyId: DeleteMediaPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteMediaMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteMediaUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}