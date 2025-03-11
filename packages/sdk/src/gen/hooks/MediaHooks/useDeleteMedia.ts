import client from '@kubb/plugin-client/clients/fetch'
import type { DeleteMediaMutationResponse, DeleteMediaPathParams } from '../../types/MediaController/DeleteMedia.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteMedia } from '../../client/MediaService/deleteMedia.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteMediaMutationKey = () => [{ url: '/company/{companyId}/media/{id}' }] as const

export type DeleteMediaMutationKey = ReturnType<typeof deleteMediaMutationKey>

/**
 * {@link /company/:companyId/media/:id}
 */
export function useDeleteMedia(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<DeleteMediaMutationResponse>,
      ResponseErrorConfig<Error>,
      { id: DeleteMediaPathParams['id']; companyId: DeleteMediaPathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteMediaMutationKey()

  return useMutation<
    ResponseConfig<DeleteMediaMutationResponse>,
    ResponseErrorConfig<Error>,
    { id: DeleteMediaPathParams['id']; companyId: DeleteMediaPathParams['companyId'] }
  >({
    mutationFn: async ({ id, companyId }) => {
      return deleteMedia({ id, companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}