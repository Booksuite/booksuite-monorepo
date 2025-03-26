import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteMediaMutationResponse, DeleteMediaPathParams } from '../../types/MediaController/DeleteMedia.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteMedia } from '../../client/MediaService/deleteMedia.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteMediaMutationKey = () => [{ url: '/company/{companyId}/media/{id}' }] as const

export type DeleteMediaMutationKey = ReturnType<typeof deleteMediaMutationKey>

/**
 * {@link /company/:companyId/media/:id}
 */
export function useDeleteMedia<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteMediaMutationResponse,
      ResponseErrorConfig<Error>,
      { id: DeleteMediaPathParams['id']; companyId: DeleteMediaPathParams['companyId'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteMediaMutationKey()

  return useMutation<
    DeleteMediaMutationResponse,
    ResponseErrorConfig<Error>,
    { id: DeleteMediaPathParams['id']; companyId: DeleteMediaPathParams['companyId'] },
    TContext
  >({
    mutationFn: async ({ id, companyId }) => {
      return deleteMedia({ id, companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}