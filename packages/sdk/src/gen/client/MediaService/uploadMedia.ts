/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { UploadMediaMutationResponse, UploadMediaPathParams } from '../../types/MediaController/UploadMedia.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getUploadMediaUrl({ companyId }: { companyId: UploadMediaPathParams['companyId'] }) {
  return `/company/${companyId}/media/upload` as const
}

/**
 * {@link /company/:companyId/media/upload}
 */
export async function uploadMedia(
  { companyId }: { companyId: UploadMediaPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UploadMediaMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getUploadMediaUrl({ companyId }).toString(),
    ...requestConfig,
  })
  return res
}