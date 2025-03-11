import client from '@kubb/plugin-client/clients/fetch'
import type { UploadMediaMutationResponse, UploadMediaPathParams } from '../../types/MediaController/UploadMedia.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
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
    mutation?: UseMutationOptions<ResponseConfig<UploadMediaMutationResponse>, ResponseErrorConfig<Error>, { companyId: UploadMediaPathParams['companyId'] }>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? uploadMediaMutationKey()

  return useMutation<ResponseConfig<UploadMediaMutationResponse>, ResponseErrorConfig<Error>, { companyId: UploadMediaPathParams['companyId'] }>({
    mutationFn: async ({ companyId }) => {
      return uploadMedia({ companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}