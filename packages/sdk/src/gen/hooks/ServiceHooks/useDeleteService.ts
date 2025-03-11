import client from '@kubb/plugin-client/clients/fetch'
import type { DeleteServiceMutationResponse, DeleteServicePathParams } from '../../types/ServiceController/DeleteService.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteService } from '../../client/ServiceService/deleteService.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteServiceMutationKey = () => [{ url: '/company/{companyId}/service/{id}' }] as const

export type DeleteServiceMutationKey = ReturnType<typeof deleteServiceMutationKey>

/**
 * {@link /company/:companyId/service/:id}
 */
export function useDeleteService(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<DeleteServiceMutationResponse>,
      ResponseErrorConfig<Error>,
      { id: DeleteServicePathParams['id']; companyId: DeleteServicePathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteServiceMutationKey()

  return useMutation<
    ResponseConfig<DeleteServiceMutationResponse>,
    ResponseErrorConfig<Error>,
    { id: DeleteServicePathParams['id']; companyId: DeleteServicePathParams['companyId'] }
  >({
    mutationFn: async ({ id, companyId }) => {
      return deleteService({ id, companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}