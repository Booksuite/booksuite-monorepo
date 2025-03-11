import client from '@kubb/plugin-client/clients/fetch'
import type { UpdateServiceMutationRequest, UpdateServiceMutationResponse, UpdateServicePathParams } from '../../types/ServiceController/UpdateService.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateService } from '../../client/ServiceService/updateService.ts'
import { useMutation } from '@tanstack/react-query'

export const updateServiceMutationKey = () => [{ url: '/company/{companyId}/service/{id}' }] as const

export type UpdateServiceMutationKey = ReturnType<typeof updateServiceMutationKey>

/**
 * {@link /company/:companyId/service/:id}
 */
export function useUpdateService(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<UpdateServiceMutationResponse>,
      ResponseErrorConfig<Error>,
      { id: UpdateServicePathParams['id']; companyId: UpdateServicePathParams['companyId']; data: UpdateServiceMutationRequest }
    >
    client?: Partial<RequestConfig<UpdateServiceMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateServiceMutationKey()

  return useMutation<
    ResponseConfig<UpdateServiceMutationResponse>,
    ResponseErrorConfig<Error>,
    { id: UpdateServicePathParams['id']; companyId: UpdateServicePathParams['companyId']; data: UpdateServiceMutationRequest }
  >({
    mutationFn: async ({ id, companyId, data }) => {
      return updateService({ id, companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}