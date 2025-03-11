import client from '@kubb/plugin-client/clients/fetch'
import type { CreateServiceMutationRequest, CreateServiceMutationResponse, CreateServicePathParams } from '../../types/ServiceController/CreateService.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createService } from '../../client/ServiceService/createService.ts'
import { useMutation } from '@tanstack/react-query'

export const createServiceMutationKey = () => [{ url: '/company/{companyId}/service/create' }] as const

export type CreateServiceMutationKey = ReturnType<typeof createServiceMutationKey>

/**
 * {@link /company/:companyId/service/create}
 */
export function useCreateService(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<CreateServiceMutationResponse>,
      ResponseErrorConfig<Error>,
      { companyId: CreateServicePathParams['companyId']; data: CreateServiceMutationRequest }
    >
    client?: Partial<RequestConfig<CreateServiceMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createServiceMutationKey()

  return useMutation<
    ResponseConfig<CreateServiceMutationResponse>,
    ResponseErrorConfig<Error>,
    { companyId: CreateServicePathParams['companyId']; data: CreateServiceMutationRequest }
  >({
    mutationFn: async ({ companyId, data }) => {
      return createService({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}