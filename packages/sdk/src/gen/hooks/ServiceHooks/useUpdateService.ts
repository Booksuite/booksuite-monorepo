import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpdateServiceMutationRequest, UpdateServiceMutationResponse, UpdateServicePathParams } from '../../types/ServiceController/UpdateService.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateService } from '../../client/ServiceService/updateService.ts'
import { useMutation } from '@tanstack/react-query'

export const updateServiceMutationKey = () => [{ url: '/company/{companyId}/service/{id}' }] as const

export type UpdateServiceMutationKey = ReturnType<typeof updateServiceMutationKey>

/**
 * {@link /company/:companyId/service/:id}
 */
export function useUpdateService<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateServiceMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateServicePathParams['id']; companyId: UpdateServicePathParams['companyId']; data?: UpdateServiceMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateServiceMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateServiceMutationKey()

  return useMutation<
    UpdateServiceMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateServicePathParams['id']; companyId: UpdateServicePathParams['companyId']; data?: UpdateServiceMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, companyId, data }) => {
      return updateService({ id, companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}