import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteServiceMutationResponse, DeleteServicePathParams } from '../../types/ServiceController/DeleteService.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteService } from '../../client/ServiceService/deleteService.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteServiceMutationKey = () => [{ url: '/company/{companyId}/service/{id}' }] as const

export type DeleteServiceMutationKey = ReturnType<typeof deleteServiceMutationKey>

/**
 * {@link /company/:companyId/service/:id}
 */
export function useDeleteService<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteServiceMutationResponse,
      ResponseErrorConfig<Error>,
      { id: DeleteServicePathParams['id']; companyId: DeleteServicePathParams['companyId'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteServiceMutationKey()

  return useMutation<
    DeleteServiceMutationResponse,
    ResponseErrorConfig<Error>,
    { id: DeleteServicePathParams['id']; companyId: DeleteServicePathParams['companyId'] },
    TContext
  >({
    mutationFn: async ({ id, companyId }) => {
      return deleteService({ id, companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}