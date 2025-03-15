import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UploadMediaMutationRequest, UploadMediaMutationResponse, UploadMediaPathParams } from '../../types/MediaController/UploadMedia.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { uploadMedia } from '../../client/MediaService/uploadMedia.ts'
import { useMutation } from '@tanstack/react-query'

export const uploadMediaMutationKey = () => [{ url: '/company/{companyId}/media/upload' }] as const

export type UploadMediaMutationKey = ReturnType<typeof uploadMediaMutationKey>

/**
 * {@link /company/:companyId/media/upload}
 */
export function useUploadMedia(
  options: {
    mutation?: UseMutationOptions<
      UploadMediaMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: UploadMediaPathParams['companyId']; data?: UploadMediaMutationRequest }
    >
    client?: Partial<RequestConfig<UploadMediaMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? uploadMediaMutationKey()

  return useMutation<
    UploadMediaMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: UploadMediaPathParams['companyId']; data?: UploadMediaMutationRequest }
  >({
    mutationFn: async ({ companyId, data }) => {
      return uploadMedia({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}