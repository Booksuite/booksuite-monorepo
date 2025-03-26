/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UploadMediaMutationRequest, UploadMediaMutationResponse, UploadMediaPathParams } from '../../types/MediaController/UploadMedia.ts'

export function getUploadMediaUrl({ companyId }: { companyId: UploadMediaPathParams['companyId'] }) {
  return `/company/${companyId}/media/upload` as const
}

/**
 * {@link /company/:companyId/media/upload}
 */
export async function uploadMedia(
  { companyId }: { companyId: UploadMediaPathParams['companyId'] },
  data?: UploadMediaMutationRequest,
  config: Partial<RequestConfig<UploadMediaMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]
      if (typeof key === 'string' && (typeof value === 'string' || (value as Blob) instanceof Blob)) {
        formData.append(key, value as unknown as string)
      }
    })
  }
  const res = await request<UploadMediaMutationResponse, ResponseErrorConfig<Error>, UploadMediaMutationRequest>({
    method: 'POST',
    url: getUploadMediaUrl({ companyId }).toString(),
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}